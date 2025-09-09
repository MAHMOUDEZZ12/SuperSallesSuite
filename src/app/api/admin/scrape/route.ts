
import { adminDb } from "@/lib/firebaseAdmin";
import { ok, fail } from "@/lib/api-helpers";
import * as cheerio from 'cheerio';

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
                };
                companies.push(company);
            }
        } catch (e) {
            console.error("Error parsing a safehold company item:", e);
        }
    });

    return companies;
}


export async function GET(req: Request) {
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
    }
    else {
        return fail("Invalid source parameter provided.", 400);
    }
    
    if (projects.length === 0) {
      return ok({ projectsAdded: 0, source, message: "No projects found or failed to parse." });
    }

    const batch = adminDb.batch();
    projects.forEach(project => {
      const docRef = adminDb.collection('projects_catalog').doc(project.id);
      batch.set(docRef, project, { merge: true });
    });

    await batch.commit();

    return ok({ projectsAdded: projects.length, source });
  } catch (e) {
    return fail(e);
  }
}
