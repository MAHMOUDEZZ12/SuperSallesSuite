
'use client';
import { Project } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useState } from "react";
import { runFlow } from "@/lib/flows";
import { Loader2, Video, Sparkles } from "lucide-react";

/**
 * The "Future of the Listing" component. This is a micro-dashboard for a single property,
 * complete with generative actions that connect search to creation.
 */
export function InteractiveListingBrief({ project }: { project: Project }) {
    const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
    const [videoUri, setVideoUri] = useState<string | null>(null);

    const handleGenerateVideo = async () => {
        if (!project.name || !project.area) {
            alert("Project details are insufficient to generate a video.");
            return;
        }
        setIsGeneratingVideo(true);
        try {
            const result = await runFlow('generate-aerial-view', { address: `${project.name}, ${project.area}` });
            if (result?.videoDataUri) {
                setVideoUri(result.videoDataUri);
            } else {
                 throw new Error("Video generation did not return a valid URI.");
            }
        } catch (error) {
            console.error("Failed to generate video", error);
        } finally {
            setIsGeneratingVideo(false);
        }
    };

    return (
        <Card className="overflow-hidden bg-muted/30 border border-border/50 mt-2">
            <div className="grid md:grid-cols-12 gap-0">
                <div className="md:col-span-4 relative h-48 md:h-full">
                    <Image
                        src={project.thumbnailUrl || '/placeholder-image.jpg'}
                        alt={`Image of ${project.name}`}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="md:col-span-8">
                    <CardContent className="p-6">
                        <h3 className="text-2xl font-bold font-heading text-white">{project.name}</h3>
                        <p className="text-sm text-primary font-semibold">{project.developer}</p>
                        <p className="text-sm text-muted-foreground mt-1">{project.area}, {project.city}</p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                           {project.status && <Badge variant="secondary">{project.status}</Badge> }
                           {project.unitTypes?.slice(0, 2).map(type => <Badge key={type} variant="outline">{type}</Badge>)}
                        </div>

                        <div className="border-t border-border/50 my-4"></div>

                        {videoUri ? (
                             <div className="space-y-2">
                                <p className="text-sm font-semibold">Instant Cinematic Tour:</p>
                                <div className="aspect-video bg-black rounded-lg">
                                    <video src={videoUri} controls autoPlay muted loop className="w-full h-full rounded-lg" />
                                </div>
                             </div>
                        ) : (
                             <Button onClick={handleGenerateVideo} disabled={isGeneratingVideo} className="w-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20">
                                {isGeneratingVideo ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Tour...</>
                                ) : (
                                    <><Sparkles className="mr-2 h-4 w-4" /> Generate Instant Video Tour</>
                                )}
                             </Button>
                        )}
                    </CardContent>
                </div>
            </div>
        </Card>
    );
}
