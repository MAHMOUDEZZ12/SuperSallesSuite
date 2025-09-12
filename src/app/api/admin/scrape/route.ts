
import { adminDb } from "@/lib/firebaseAdmin";
import { ok, fail } from "@/lib/api-helpers";
import * as cheerio from 'cheerio';
import { CollectionReference } from "firebase-admin/firestore";
import { NextRequest } from "next/server";

async function scrapeDxbOffplan() {
  const baseUrl = "https://dxboffplan.com";
  const response = await fetch(`${baseUrl}/developers/`);
  const html = await response.text();
  const $ = cheerio.load(html);

  const projects: any[] = [];
  const projectPromises = $('.project-item').map(async (i, el) => {
    try {
        const name = $(el).find('h2').text().trim();
        const developer = $(el).find('.developer-name span').text().trim();
        const location = $(el).find('.location-name span').text().trim();
        const priceText = $(el).find('.price-details .starting-price').text().trim();
        
        if (name && developer) {
            const project = {
                id: `dxboffplan-${name.toLowerCase().replace(/\s+/g, '-')}`,
                name,
                developer,
                area: location,
                priceFrom: priceText || 'N/A',
                country: 'AE',
                city: 'Dubai',
                status: 'Off-plan', // Assuming most are off-plan from this site
                tags: ['dxboffplan.com', 'scrape'],
                 developerLogoUrl: `/logos/${developer.toLowerCase().replace(/\s+/g, '-')}-logo.png`,
            };
            projects.push(project);
        }
    } catch(e) {
        console.error("Error parsing a dxboffplan project item:", e);
    }
  }).get();
  
  await Promise.all(projectPromises);
  return projects;
}

async function scrapePropertyFinder() {
    const baseUrl = "https://www.propertyfinder.ae/en/new-projects";
    const response = await fetch(baseUrl);
    const html = await response.text();
    const $ = cheerio.load(html);

    const projects: any[] = [];
    $('.card-list__item').each((i, el) => {
        try {
            const name = $(el).find('.card__title').text().trim();
            const developer = $(el).find('.card__property-logo-name').text().trim();
            const location = $(el).find('.card__location').text().trim();
            const priceText = $(el).find('.card__price-value').text().trim();

            if (name && developer) {
                 const project = {
                    id: `pf-${name.toLowerCase().replace(/\s+/g, '-')}`,
                    name,
                    developer,
                    area: location,
                    priceFrom: priceText || 'N/A',
                    country: 'AE',
                    city: 'Dubai',
                    status: 'New Launch', // Assuming these are new from this page
                    tags: ['propertyfinder.ae', 'scrape'],
                    developerLogoUrl: `/logos/${developer.toLowerCase().replace(/\s+/g, '-')}-logo.png`,
                };
                projects.push(project);
            }
        } catch (e) {
            console.error("Error parsing a propertyfinder project item:", e);
        }
    });

    return projects;
}


async function scrapeSafehold() {
    const baseUrl = "https://safeholduae.com/top-100-real-estate-companies-in-dubai/";
    const response = await fetch(baseUrl);
    const html = await response.text();
    const $ = cheerio.load(html);

    const companies: any[] = [];
    $('h3.wp-block-heading').each((i, el) => {
        try {
            const text = $(el).text().trim();
            // Assuming format is "1. Company Name"
            const match = text.match(/^\d+\.\s*(.*)/);
            if (match && match[1]) {
                const developer = match[1].trim();
                const company = {
                    id: `safehold-${developer.toLowerCase().replace(/\s+/g, '-')}`,
                    name: `${developer} - Various Projects`, // Placeholder name
                    developer: developer,
                    area: 'Dubai',
                    country: 'AE',
                    city: 'Dubai',
                    status: 'Active Developer',
                    tags: ['safeholduae.com', 'scrape', 'developer'],
                    developerLogoUrl: `/logos/${developer.toLowerCase().replace(/\s+/g, '-')}-logo.png`,
                };
                companies.push(company);
            }
        } catch (e) {
            console.error("Error parsing a safehold company item:", e);
        }
    });

    return companies;
}

async function scrapeEmiratesEstate() {
  const baseUrl = "https://emirates.estate/dubai-projects/";
  const response = await fetch(baseUrl);
  const html = await response.text();
  const $ = cheerio.load(html);

  const projects: any[] = [];
  $('.project-card-v2').each((i, el) => {
    try {
        const name = $(el).find('.project-card-v2__title a').text().trim();
        const developer = $(el).find('.project-card-v2__developer').text().trim();
        const location = $(el).find('.project-card-v2__location').text().trim();
        const priceText = $(el).find('.project-card-v2__price-value').text().trim();
        
        if (name && developer) {
            const project = {
                id: `ee-${name.toLowerCase().replace(/\s+/g, '-')}`,
                name,
                developer,
                area: location,
                priceFrom: priceText ? `AED ${priceText}` : 'N/A',
                country: 'AE',
                city: 'Dubai',
                status: 'Varies', 
                tags: ['emirates.estate', 'scrape'],
                developerLogoUrl: `/logos/${developer.toLowerCase().replace(/\s+/g, '-')}-logo.png`,
            };
            projects.push(project);
        }
    } catch(e) {
        console.error("Error parsing an Emirates.Estate project item:", e);
    }
  });
  
  return projects;
}

async function processAndArchive(projects: any[], collection: CollectionReference, archiveCollection: CollectionReference) {
    let updatedCount = 0;
    const batch = adminDb.batch();

    for (const project of projects) {
        const docRef = collection.doc(project.id);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            const existingData = docSnap.data();
            // Basic check for changes. A more robust implementation might use a hash or deep comparison.
            if (JSON.stringify(existingData) !== JSON.stringify(project)) {
                // Data has changed, archive the old version
                const archiveRef = archiveCollection.doc(`${project.id}_${Date.now()}`);
                batch.set(archiveRef, { ...existingData, archivedAt: new Date() });
                batch.set(docRef, project, { merge: true });
                updatedCount++;
            }
        } else {
            // New project
            batch.set(docRef, project);
            updatedCount++;
        }
    }

    await batch.commit();
    return updatedCount;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const source = searchParams.get('source') || 'dxboffplan';
    
    let projects: any[] = [];
    
    if (source === 'dxboffplan') {
        projects = await scrapeDxbOffplan();
    } else if (source === 'propertyfinder') {
        projects = await scrapePropertyFinder();
    } else if (source === 'safehold') {
        projects = await scrapeSafehold();
    } else if (source === 'emiratesestate') {
        projects = await scrapeEmiratesEstate();
    }
    else {
        return fail("Invalid source parameter provided.", 400);
    }
    
    if (projects.length === 0) {
      return ok({ projectsAdded: 0, source, message: "No projects found or failed to parse." });
    }

    const liveCollection = adminDb.collection('projects_catalog');
    const archiveCollection = adminDb.collection('projects_archive');
    
    const projectsAdded = await processAndArchive(projects, liveCollection, archiveCollection);

    return ok({ projectsAdded, source });
  } catch (e) {
    return fail(e);
  }
}
