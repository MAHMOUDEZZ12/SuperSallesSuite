import { PageHeader } from "@/components/ui/page-header";
import { tools, modules } from "@/lib/features";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Palette, Rocket } from "lucide-react";
import Link from 'next/link';
import { FeatureModal } from "@/components/feature-modal";

/**
 * The "Flows" page - A grand, central destination showcasing our
 * entire orchestra of solutions, designed with a wide, enterprise-grade layout.
 * Replaces the obsolete /solutions routes.
 */
export default function FlowsPage() {
    const solutionOrchestras = [
        {
            id: 'agents',
            title: 'AI Agents',
            description: 'Autonomous, analytical, and persona-driven AI co-pilots designed to perform complex reasoning and strategic tasks.',
            icon: <Bot className="h-6 w-6" />,
            // Logic to get tools of type 'agent' or similar would go here
            tools: tools.filter(t => t?.mindMapCategory === 'Market Intelligence' || t?.mindMapCategory === 'EBRAM')
        },
        {
            id: 'flows',
            title: 'Automated Flows',
            description: 'Powerful, multi-step "Pilot" workflows that chain multiple agents together to automate an entire business process from start to finish.',
            icon: <Rocket className="h-6 w-6" />,
            tools: tools.filter(t => t?.type === 'pilot' || t?.type === 'dashboard')
        },
        {
            id: 'apps',
            title: 'Creative Apps',
            description: 'A suite of single-purpose generative tools for creating high-quality marketing assets, from videos and ad copy to entire landing pages.',
            icon: <Palette className="h-6 w-6" />,
            tools: tools.filter(t => t?.mindMapCategory === 'Archy')
        }
    ];

    return (
        <div className="container mx-auto px-6 py-12 max-w-[120rem]">
            <PageHeader
                title="The WhatsMAP Solutions Universe"
                description="A complete and integrated ecosystem of AI agents, automated flows, and creative apps, all powered by a single, intelligent core."
                className="text-center"
            />
            
            <div className="mt-16 space-y-20">
                {solutionOrchestras.map(orchestra => (
                    <section key={orchestra.id}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-muted rounded-lg border border-border">{orchestra.icon}</div>
                            <div>
                               <h2 className="text-3xl font-bold font-heading">{orchestra.title}</h2>
                               <p className="text-muted-foreground">{orchestra.description}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {orchestra.tools.map(tool => tool && (
                                <FeatureModal key={tool.id} feature={tool}>
                                    <div className="group cursor-pointer bg-muted/40 p-6 rounded-lg border border-border/50 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                                        <h3 className="font-semibold text-lg">{tool.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1 flex-grow">{tool.description}</p>
                                        <div className="mt-4 text-xs text-primary font-semibold flex items-center">
                                            Learn More <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </FeatureModal>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
