
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, Palette, Pen, Upload, Download, MonitorPlay, LayoutTemplate, Building, CheckCircle, AlertTriangle, PlusCircle, ClipboardList } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { track } from '@/lib/events';
import { useCanvas } from '@/context/CanvasContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

// Mock function to simulate adding an issue to the dev admin changelog
const addIssueToChangeLog = (description: string) => {
    try {
        const savedLog = localStorage.getItem('changeLog');
        const changeLog = savedLog ? JSON.parse(savedLog).map((log: any) => ({...log, timestamp: new Date(log.timestamp)})) : [];
        const newLogEntry = {
            id: `cl-${Date.now()}`,
            timestamp: new Date().toISOString(),
            toolId: 'listing-manager',
            toolTitle: 'Listing Manager',
            description,
            status: 'Issue Reported',
            comment: 'Automated request from the Listing Manager tool.'
        };
        const updatedLog = [newLogEntry, ...changeLog];
        localStorage.setItem('changeLog', JSON.stringify(updatedLog));
        console.log("Issue logged to dev-admin:", newLogEntry);
    } catch (error) {
        console.error("Failed to update changelog in localStorage", error);
    }
};


export default function ListingManagerPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProject, setSelectedProject] = useState('');
    const [hasCheckedAssets, setHasCheckedAssets] = useState(false);
    const [assetsOk, setAssetsOk] = useState(false);

    const [listingPlan, setListingPlan] = useState<any>(null);

    const [portalName, setPortalName] = useState('');
    const [portalScreenshot, setPortalScreenshot] = useState<File | null>(null);

    const handleProjectSelect = (projectId: string) => {
        setSelectedProject(projectId);
        setIsLoading(true);
        setHasCheckedAssets(false);
        setAssetsOk(false);
        setListingPlan(null);

        // Simulate checking for assets
        setTimeout(() => {
            setHasCheckedAssets(true);
            // Simulate that Damac Hills 2 is missing assets
            if (projectId === 'damac-hills-2') {
                setAssetsOk(false);
                addIssueToChangeLog(`Project "Damac Hills 2" is missing high-quality images. Please source and upload them to the project library.`);
                toast({
                    title: "Asset Request Sent",
                    description: `The selected project is missing HQ images. An admin request has been sent to source them. Check the Dev Admin log for details.`,
                    duration: 10000,
                    action: <Link href="/dashboard/dev-admin"><Button size="sm">View Log</Button></Link>
                });
            } else {
                setAssetsOk(true);
                toast({ title: "Project Assets Verified", description: "All high-quality images and data are available for this project." });
            }
            setIsLoading(false);
        }, 2000);
    };
    
    const handleGeneratePlan = () => {
         setIsLoading(true);
         setListingPlan(null);
         setTimeout(() => {
            const plan = {
                listingReferenceNo: `PF-${Date.now().toString().slice(-6)}`,
                propertyTitle: `Stunning 3BR Villa in ${selectedProject.replace(/-/g, ' ')}`,
                propertyDescription: `Experience luxury living in this magnificent 3-bedroom villa in the prestigious ${selectedProject.replace(/-/g, ' ')} community. This home boasts spacious interiors, modern finishes, and access to world-class amenities. Perfect for families seeking a premium lifestyle.`,
                price: 3500000,
                imageUrls: [
                    "https://picsum.photos/seed/prop1/800/600",
                    "https://picsum.photos/seed/prop2/800/600",
                    "https://picsum.photos/seed/prop3/800/600",
                ]
            };
            setListingPlan(plan);
            setIsLoading(false);
            toast({title: "Portal-Ready Plan Generated", description: "Your listing plan is ready to be sent to a Pilot."});
         }, 1500)
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: 'Plan Copied!', description: 'The JSON plan has been copied to your clipboard.' });
    };

    const handlePortalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!portalName || !portalScreenshot) {
            toast({ title: "Missing Information", description: "Please provide a portal name and a screenshot.", variant: 'destructive'});
            return;
        }
        addIssueToChangeLog(`New portal submission: "${portalName}". User has uploaded a screenshot of the form. Please review and add support.`);
        toast({
            title: "Portal Submitted for Review",
            description: `Thank you! "${portalName}" has been added to our queue. An admin will review it shortly.`,
            action: <Link href="/dashboard/dev-admin"><Button size="sm">View Log</Button></Link>
        });
        setPortalName('');
        setPortalScreenshot(null);
    };

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Listing Manager"
                description="Your central hub to prepare and syndicate listings to major portals."
                icon={<Building className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                    <Card>
                        <CardHeader>
                            <CardTitle>1. Project Selection</CardTitle>
                            <CardDescription>Choose a project to generate a listing for.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-2">
                                <Label htmlFor="projectId">Project</Label>
                                <Select value={selectedProject} onValueChange={handleProjectSelect}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a project" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="emaar-beachfront">Emaar Beachfront</SelectItem>
                                        <SelectItem value="damac-hills-2">Damac Hills 2</SelectItem>
                                        <SelectItem value="sobha-hartland">Sobha Hartland</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {isLoading && !hasCheckedAssets && (
                                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    Checking project assets...
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    
                    {hasCheckedAssets && (
                        <Card>
                            <CardHeader>
                               <CardTitle>2. Generate Listing Plan</CardTitle>
                                <CardDescription>Create a portal-ready plan for your listing.</CardDescription>
                            </CardHeader>
                             <CardContent>
                                {!assetsOk && (
                                     <Alert variant="destructive">
                                        <AlertTriangle className="h-4 w-4" />
                                        <AlertTitle>Missing Assets</AlertTitle>
                                        <AlertDescription>
                                            This project is missing required high-quality images. An admin request has been logged. You can check its status on the <Link href="/dashboard/dev-admin" className="underline font-semibold">Dev Admin</Link> page.
                                        </AlertDescription>
                                    </Alert>
                                )}
                             </CardContent>
                            <CardFooter>
                                <Button className="w-full" disabled={!assetsOk || isLoading} onClick={handleGeneratePlan}>
                                    {isLoading && listingPlan === null ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Wand2 className="mr-2 h-4 w-4" />}
                                     {isLoading && listingPlan === null ? 'Generating...' : 'Generate Plan'}
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </div>

                <div className="lg:col-span-2 space-y-8">
                   <Card>
                       <CardHeader>
                           <CardTitle>3. Send to a Pilot</CardTitle>
                           <CardDescription>Copy the generated "Rollflow" plan and paste it into the appropriate portal pilot to publish your listing.</CardDescription>
                       </CardHeader>
                       <CardContent>
                           {listingPlan ? (
                            <div className="space-y-4">
                               <Textarea
                                    readOnly
                                    value={JSON.stringify(listingPlan, null, 2)}
                                    rows={15}
                                    className="font-mono text-xs bg-muted"
                                />
                                <div className="flex gap-2 flex-wrap">
                                    <Button onClick={() => copyToClipboard(JSON.stringify(listingPlan, null, 2))}>
                                        <Pen className="mr-2 h-4 w-4" /> Copy Plan
                                    </Button>
                                    <Link href="/dashboard/tool/property-finder-sync">
                                        <Button variant="outline">Go to Property Finder Pilot</Button>
                                    </Link>
                                     <Link href="/dashboard/tool/bayut-sync">
                                        <Button variant="outline">Go to Bayut Pilot</Button>
                                    </Link>
                                </div>
                            </div>
                           ) : (
                                <div className="flex flex-col items-center justify-center h-96 border-dashed border-2 rounded-lg text-center p-6">
                                    <ClipboardList className="h-16 w-16 mx-auto mb-4 opacity-10" />
                                    <h3 className="text-lg font-semibold text-foreground">Your Listing Plan Will Appear Here</h3>
                                    <p className="text-muted-foreground">Select a project and generate a plan to get started.</p>
                                </div>
                           )}
                       </CardContent>
                   </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Add a New Portal</CardTitle>
                            <CardDescription>Don't see your portal? Add it here. Our team will review it and add official support.</CardDescription>
                        </CardHeader>
                        <form onSubmit={handlePortalSubmit}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="portalName">Portal Name</Label>
                                    <Input id="portalName" value={portalName} onChange={e => setPortalName(e.target.value)} placeholder="e.g., Zillow, Rightmove" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="portalScreenshot">Submission Form Screenshot</Label>
                                    <Input id="portalScreenshot" type="file" accept="image/*" onChange={e => setPortalScreenshot(e.target.files?.[0] || null)} />
                                    <p className="text-xs text-muted-foreground">Upload a screenshot of the portal's property submission form.</p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={!portalName || !portalScreenshot}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Submit Portal for Review
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </main>
    );
}
