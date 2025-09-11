
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Field } from '@/lib/features';
import { tools as clientTools, fileToDataUri, filesToDataUris } from '@/lib/tools-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2, Sparkles, AlertCircle, Upload, Info, PlusCircle, CreditCard, ArrowRight, LucideIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Confetti } from '@/components/confetti';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { track } from '@/lib/events';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Feature } from '@/lib/features';
import { IconMap } from '@/components/ui/icon-map';


const getToolSchema = (tool: Omit<Feature, 'renderResult'> | undefined) => {
    if (!tool) return z.object({});
    
    const shape = tool.creationFields.reduce((acc, field) => {
        if (field.type === 'button' || field.type === 'group-header') return acc;
        
        let fieldSchema: z.ZodTypeAny;

        const optionalFileFields = ['companyLogoDataUri', 'brochureDataUri', 'inspirationImageDataUri', 'newImages'];
        const optionalTextFields = ['additionalInformation', 'projectName', 'developer', 'context', 'deepEditInstructions'];

        if (field.type === 'file') {
            const isOptional = optionalFileFields.includes(field.id) || (tool.id === 'insta-ads-designer' && field.id === 'brochureDataUri');
            const fileListSchema = z.custom<FileList>().nullable().optional();

            if (isOptional) {
                fieldSchema = fileListSchema;
            } else {
                fieldSchema = z.custom<FileList>().refine(files => files && files.length > 0, `${field.name} is required.`);
            }
        } else if (field.type === 'number') {
            fieldSchema = z.string().min(1, `${field.name} is required`).refine(val => !isNaN(Number(val)), { message: "Must be a number" });
        } else if (optionalTextFields.includes(field.id) || (tool.id === 'insta-ads-designer' && field.id === 'projectId') ) {
             fieldSchema = z.string().optional();
        }
        else {
            fieldSchema = z.string().min(1, `${field.name} is required`);
        }

        (acc as any)[field.id] = fieldSchema;

        return acc;
    }, {} as Record<string, z.ZodTypeAny>);

    const baseSchema = z.object(shape);

    // Add cross-field validations
    return baseSchema.refine(data => {
        if (tool.id === 'insta-ads-designer') {
            // Either projectId is selected, or a brochure is uploaded.
            return data.projectId || (data.brochureDataUri && data.brochureDataUri.length > 0);
        }
        return true;
    }, {
        message: 'Either a Project or a Brochure must be provided.',
        path: ['projectId'], 
    });
};


const appsThatNeedConnection: { [key: string]: string } = {
    'meta-ads-copilot': 'Facebook',
    'audience-creator': 'Facebook',
    'insta-ads-designer': 'Instagram',
    'instagram-admin-ai': 'Instagram',
    'email-creator': 'Gmail / Outlook',
    'whatsapp-campaigns': 'WhatsApp Business',
    'facebook-ads-ai': 'Facebook',
    'reel-ads-ai': 'Instagram',
    'story-planner-ai': 'Instagram'
};

const appsThatNeedPayment: string[] = [
    'rebranding',
    'pdf-editor',
    'landing-pages',
    'investor-matching',
    'market-reports',
    'market-trends'
];


const AppActivationGate = ({ tool, onActivated }: { tool: Omit<Feature, 'renderResult'>, onActivated: () => void }) => {
    const { toast } = useToast();
    const [isConnecting, setIsConnecting] = React.useState(false);
    const connectionRequired = appsThatNeedConnection[tool.id];
    const paymentRequired = appsThatNeedPayment.includes(tool.id);
    const Icon = IconMap[tool.icon as keyof typeof IconMap];

    const handleAction = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsConnecting(true);
        setTimeout(() => {
            setIsConnecting(false);
            onActivated();
            track('app_added', { toolId: tool.id, connectionType: connectionRequired ? 'api' : paymentRequired ? 'payment' : 'direct' });
            toast({
                title: `${tool.title} Activated!`,
                description: `You can now use the ${tool.title} tool.`
            });
        }, 1500);
    }
    
    let DialogComponent;
    
    if (connectionRequired) {
        DialogComponent = (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                     <Button size="lg"><PlusCircle className="mr-2 h-4 w-4" /> Add to Workspace</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Connect to {connectionRequired}</AlertDialogTitle>
                    <AlertDialogDescription>
                        To use the {tool.title} tool, you need to securely connect your {connectionRequired} account.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAction} disabled={isConnecting}>
                        {isConnecting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                        Connect to {connectionRequired}
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    } else if (paymentRequired) {
         DialogComponent = (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                     <Button size="lg"><PlusCircle className="mr-2 h-4 w-4" /> Add to Workspace</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2"><CreditCard /> Unlock with Subscription</AlertDialogTitle>
                    <AlertDialogDescription>
                        The "{tool.title}" tool is a premium feature. To activate it, please confirm your subscription or add a payment method.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAction} disabled={isConnecting}>
                        {isConnecting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                        Confirm & Unlock
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    } else {
        DialogComponent = (
             <Button size="lg" onClick={(e) => {
                e.preventDefault();
                onActivated();
                track('app_added', { toolId: tool.id, connectionType: 'direct' });
                toast({ title: `${tool.title} Added!`, description: 'The tool is now available in your workspace.' });
            }}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add to Workspace
            </Button>
        )
    }

    return (
        <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
                <div className="p-3 rounded-lg w-fit text-white mx-auto" style={{ backgroundColor: tool.color }}>
                    <Icon className="h-10 w-10" />
                </div>
                 <CardTitle className="text-2xl mt-4">Activate {tool.title}</CardTitle>
                <CardDescription>This app isn't in your workspace yet. Add it to start generating.</CardDescription>
            </CardHeader>
            <CardContent>
                {DialogComponent}
                 <Link href="/dashboard/marketing">
                    <Button variant="link" className="mt-4">Back to Apps</Button>
                </Link>
            </CardContent>
        </Card>
    );
};


export default function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>();
  const router = useRouter();
  const [tool, setTool] = React.useState<Omit<Feature, 'renderResult'> | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<any | null>(null);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [showCampaignNotice, setShowCampaignNotice] = React.useState(false);
  const { toast } = useToast();
  
  const [isAppAdded, setIsAppAdded] = React.useState(false);


  React.useEffect(() => {
    const currentTool = clientTools.find((t) => t.id === toolId);
    if (currentTool?.isPage) {
        // This is a tool with a dedicated page, so we shouldn't be here.
        // Redirect to its proper page.
        router.replace(`/dashboard/tool/${toolId}`);
        return;
    }
    
    setTool(currentTool);
    if (currentTool?.id === 'audience-creator') {
        setShowCampaignNotice(true);
    }
  }, [toolId, router]);
  
  React.useEffect(() => {
    if (toolId) {
        const addedApps = JSON.parse(localStorage.getItem('addedApps') || '[]');
        const currentTool = clientTools.find((t) => t.id === toolId);
        setIsAppAdded(addedApps.includes(toolId) || !currentTool?.badge);
    }
  }, [toolId]);

  const handleAppActivation = () => {
    const addedApps = JSON.parse(localStorage.getItem('addedApps') || '[]');
    localStorage.setItem('addedApps', JSON.stringify([...addedApps, toolId]));
    setIsAppAdded(true);
  }

  const schema = React.useMemo(() => getToolSchema(tool), [tool]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: tool?.creationFields.reduce((acc, field) => {
      if (field.type !== 'button' && field.type !== 'group-header' && !field.hidden) {
        (acc as any)[field.id] = field.type === 'file' ? null : field.value || '';
      }
      return acc;
    }, {})
  });

  if (!tool) {
    return (
        <div className="flex h-[80vh] items-center justify-center">
            <Card className="m-4">
                <CardHeader>
                    <CardTitle>Tool not found</CardTitle>
                    <CardDescription>Please select a tool from the sidebar to get started.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
  }
  
  const handleGeneration = async (data: Record<string, any>) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setShowConfetti(false);

    try {
        const currentTool = clientTools.find(t => t.id === toolId);
        if (!currentTool) throw new Error(`Tool with id "${toolId}" not found.`);

        let payload: Record<string, any> = {};

        // Special handling for insta-ads-designer
        if (currentTool.id === 'insta-ads-designer' && data.projectId) {
            // In a real app, we'd fetch the project's brochure URI from a database.
            // For now, we'll simulate this.
            payload.projectName = data.projectId; // Send name instead of brochure
            // brochureDataUri will be omitted, letting the backend know to use the project name.
        }


        for (const field of currentTool.creationFields) {
            const fieldId = field.id;
            if (field.type === 'button' || field.type === 'group-header' || !data.hasOwnProperty(fieldId)) continue;
            
            // Skip brochureDataUri for insta-ads if projectId is set
            if (currentTool.id === 'insta-ads-designer' && data.projectId && fieldId === 'brochureDataUri') {
                continue;
            }

            const value = data[fieldId];
            if (value === null || value === undefined) continue;

            if (field.type === 'file' && value instanceof FileList && value.length > 0) {
                 if (field.multiple) {
                    payload[fieldId] = await filesToDataUris(value);
                } else {
                    payload[fieldId] = await fileToDataUri(value[0]);
                }
            } else if (field.type === 'number') {
                 payload[fieldId] = Number(value);
            } else if (field.type !== 'file' && value) {
                payload[fieldId] = value;
            }
        }
        
        track('tool_run_started', { toolId });

        const response = await fetch('/api/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ toolId, payload }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.error || 'An API error occurred.');
        }
        
        setResult(responseData);
        setShowConfetti(true);
        track('tool_run_succeeded', { toolId });
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'An unexpected error occurred.');
      toast({
          title: "Generation Failed",
          description: e.message,
          variant: 'destructive',
      });
      track('tool_run_failed', { toolId, error: e.message });
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderField = (field: Field) => {
    if (field.hidden) return null;
    
    if (field.type === 'group-header') {
        return (
            <div key={field.id} className="md:col-span-2 mt-4 first:mt-0">
                <h3 className="text-lg font-semibold text-foreground">{field.name}</h3>
                 {field.description && <p className="text-sm text-muted-foreground mb-2">{field.description}</p>}
                <Separator />
            </div>
        );
    }

    const fieldError = errors[field.id];

    return (
        <div key={field.id} className={cn("space-y-2", (field.type === 'textarea') && "md:col-span-2" )}>
        {field.type !== 'button' && <Label htmlFor={field.id} className="font-semibold">{field.name}</Label>}
        <Controller
            name={field.id as any}
            control={control}
            render={({ field: { onChange, onBlur, value, name, ref } }) => {
                const fileList: FileList | null = value;
                switch (field.type) {
                    case 'text':
                    return <Input id={field.id} placeholder={field.placeholder} onChange={onChange} value={value || ''} onBlur={onBlur} name={name} ref={ref} />;
                    case 'number':
                        return <Input id={field.id} type="number" placeholder={field.placeholder} onChange={onChange} value={value || ''} onBlur={onBlur} name={name} ref={ref} />;
                    case 'textarea':
                    return <Textarea id={field.id} placeholder={field.placeholder} onChange={onChange} value={value || ''} onBlur={onBlur} name={name} ref={ref} rows={field.id === 'editInstructions' ? 5 : 3} />;
                    case 'file':
                        return (
                        <div>
                            <Input id={field.id} type="file" multiple={field.multiple} onBlur={onBlur} name={name} ref={ref} onChange={e => onChange(e.target.files)} className="sr-only" />
                            <label 
                                htmlFor={field.id} 
                                className={cn(
                                    "flex items-center justify-center gap-2 w-full h-10 px-3 py-2 text-sm border-input border rounded-md cursor-pointer bg-background hover:bg-muted/50",
                                    fileList && fileList.length > 0 && "text-primary border-primary/50"
                                )}
                            >
                                <Upload className="h-4 w-4"/>
                                <span>{fileList && fileList.length > 0 ? `${fileList.length} file(s) selected` : `Choose file(s)...`}</span>
                            </label>
                        </div>
                        );
                    case 'select':
                    return (
                        <Select 
                            onValueChange={(val) => {
                                if (val === 'Add New Project...') {
                                    router.push('/dashboard/tool/projects-finder');
                                } else {
                                    onChange(val);
                                }
                            }} 
                            defaultValue={value}
                        >
                        <SelectTrigger id={field.id}>
                            <SelectValue placeholder={field.placeholder || `Select ${field.name}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options?.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    );
                    case 'button':
                        return (
                            <Link href="/dashboard/brand" className='w-full'>
                            <Button type="button" variant="outline" className='w-full justify-start'>
                                {field.cta}
                            </Button>
                            </Link>
                        )
                    default:
                    return null;
                }
            }}
            />
        <p className="text-xs text-muted-foreground">{field.description}</p>
        {fieldError && <p className="text-sm text-destructive">{fieldError.message as string}</p>}
        </div>
    );
  };
  
  const Icon = IconMap[tool.icon as keyof typeof IconMap];
  const fullTool = clientTools.find(t => t.id === toolId);
  
  return (
    <main className="p-4 md:p-10 space-y-8">
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      
      {showCampaignNotice && (
        <Alert data-state={showCampaignNotice ? 'open' : 'closed'} className="max-w-4xl mx-auto animate-in fade-in-0 slide-in-from-top-5 duration-500">
            <Info className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
               <div className="flex-grow">You have no campaign creation started. You can still generate an audience, but to use them you must start a campaign.</div>
               <div className='flex gap-2 flex-shrink-0'>
                    <Link href="/dashboard/tool/meta-ads-copilot">
                        <Button size="sm">Start a Campaign</Button>
                    </Link>
                    <Button size="sm" variant="ghost" onClick={() => setShowCampaignNotice(false)}>I'm just discovering</Button>
               </div>
            </AlertDescription>
        </Alert>
      )}
      
      {!isAppAdded ? (
        <AppActivationGate tool={tool} onActivated={handleAppActivation} />
      ) : (
        <>
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="p-3 rounded-lg w-fit text-white shrink-0" style={{ backgroundColor: tool.color }}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div>
                    <CardTitle className="text-3xl font-heading">{tool.title}</CardTitle>
                    <CardDescription className="text-md">{tool.description}</CardDescription>
                    </div>
                </div>
                </CardHeader>
                <form onSubmit={handleSubmit(handleGeneration)}>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tool.creationFields.map(renderField)}
                    </div>
                    {errors.root && <p className="text-sm text-destructive mt-4">{errors.root.message as string}</p>}
                </CardContent>
                <CardFooter>
                    <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {tool.cta.replace(/\b\w/g, l => l.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2')}ing...
                        </>
                    ) : (
                        <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        {tool.cta}
                        </>
                    )}
                    </Button>
                </CardFooter>
                </form>
            </Card>
            
            {error && !result && (
                <Alert variant="destructive" className="max-w-4xl mx-auto">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {result && fullTool?.renderResult && (
                <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-heading">Your Result</CardTitle>
                    <CardDescription>Here is the content generated by the AI.</CardDescription>
                </CardHeader>
                <CardContent>
                    {fullTool.renderResult(result, toast)}
                </CardContent>
                </Card>
            )}
        </>
      )}
    </main>
  );
}
