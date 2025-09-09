
'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Palette, Upload, Save, CheckCircle, BrainCircuit, FileText, ImageIcon, FileSpreadsheet, Download, Trash2, Loader2, Info } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/ui/page-header';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { aiBrandCreator } from '@/ai/flows/ai-brand-creator';
import { fileToDataUri } from '@/lib/tools-client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const brandSchema = z.object({
  companyName: z.string().min(2, 'Company name is required.'),
  logo: z.any().optional(),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color.'),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color.'),
  contactInfo: z.string().min(10, 'Contact info is required.'),
});

type BrandFormValues = z.infer<typeof brandSchema>;
type MockFile = { id: number; name: string; type: string; icon: React.ReactNode; size: string; file?: File };


const initialMockFiles: MockFile[] = [
  { id: 1, name: 'Emaar_Beachfront_Brochure.pdf', type: 'PDF', icon: <FileText className="h-10 w-10 text-destructive" />, size: '2.5 MB' },
  { id: 2, name: 'Company_Logo_White.png', type: 'PNG', icon: <ImageIcon className="h-10 w-10 text-primary" />, size: '150 KB' },
  { id: 3, name: 'Sobha_Hartland_Ad.jpg', type: 'JPG', icon: <ImageIcon className="h-10 w-10 text-primary" />, size: '800 KB' },
  { id: 4, name: 'Investor_List_Q2.csv', type: 'CSV', icon: <FileSpreadsheet className="h-10 w-10 text-green-500" />, size: '320 KB' },
  { id: 5, name: 'Rebranded_DAMAC_Brochure.pdf', type: 'PDF', icon: <FileText className="h-10 w-10 text-destructive" />, size: '2.8 MB' },
  { id: 6, name: 'Marina_Landing_Page_Hero.jpg', type: 'JPG', icon: <ImageIcon className="h-10 w-10 text-primary" />, size: '1.2 MB' },
];


export default function BrandPage() {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedPalette, setSelectedPalette] = React.useState({ name: 'Charcoal & Mint', primary: '#36454F', secondary: '#98FF98' });
  
  const [isTraining, setIsTraining] = useState(false);
  const [files, setFiles] = useState<MockFile[]>(initialMockFiles);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const colorPalettes = [
    { name: 'Teal & Orange', primary: '#008080', secondary: '#CC6633' },
    { name: 'Navy & Gold', primary: '#000080', secondary: '#FFD700' },
    { name: 'Forest & Silver', primary: '#228B22', secondary: '#C0C0C0' },
    { name: 'Charcoal & Mint', primary: '#36454F', secondary: '#98FF98' },
    { name: 'Indigo & Coral', primary: '#4B0082', secondary: '#FF7F50' },
    { name: 'Slate & Rose', primary: '#708090', secondary: '#FFC0CB' },
    { name: 'Crimson & Beige', primary: '#DC143C', secondary: '#F5F5DC' },
    { name: 'Sky & Sun', primary: '#87CEEB', secondary: '#FFD700' },
  ];

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      companyName: 'Super Seller Suite',
      primaryColor: selectedPalette.primary,
      secondaryColor: selectedPalette.secondary,
      contactInfo: 'John Doe\n(555) 123-4567\njohn.doe@superseller.ai',
    },
  });

  const handlePaletteSelect = (palette: typeof colorPalettes[0]) => {
    setSelectedPalette(palette);
    setValue('primaryColor', palette.primary);
    setValue('secondaryColor', palette.secondary);
  };

  const onSubmit = (data: BrandFormValues) => {
    console.log(data);
    return new Promise(resolve => {
        setTimeout(() => {
            toast({
              title: 'Brand Saved!',
              description: 'Your brand assets have been updated successfully.',
            });
            resolve(true);
        }, 1000)
    });
  };
  
  const handleLogoFileChange = (files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      setValue("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleAssetFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    const newFiles: MockFile[] = Array.from(uploadedFiles).map((file, index) => ({
      id: files.length + index + 1,
      name: file.name,
      type: file.type.split('/')[1]?.toUpperCase() || 'File',
      icon: <FileText className="h-10 w-10 text-muted-foreground" />,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      file: file,
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };
    
  const handleSelectFile = (fileId: number) => {
      setSelectedFiles(prev => 
          prev.includes(fileId) 
              ? prev.filter(id => id !== fileId) 
              : [...prev, fileId]
      );
  };
  
  const handleDeleteFiles = () => {
     setFiles(prev => prev.filter(f => !selectedFiles.includes(f.id)));
     setSelectedFiles([]);
  }

  const handleTrainAssistant = async () => {
      const filesToTrain = files.filter(f => selectedFiles.includes(f.id) && f.file);
      if (filesToTrain.length === 0) {
        toast({
            title: "No Files Selected",
            description: "Please select one or more files to extract brand information from.",
            variant: "destructive"
        });
        return;
      }
      
      setIsTraining(true);
      toast({
          title: "AI Extraction Started",
          description: `The assistant is analyzing ${filesToTrain.length} file(s) to populate your brand kit.`,
      });

      try {
        const fileDataUris = await Promise.all(
          filesToTrain.map(f => fileToDataUri(f.file!))
        );
        
        const result = await aiBrandCreator({
          command: "Analyze the provided documents and extract the company name, primary and secondary brand colors, and contact information. Use this to set up my brand kit.",
          documents: fileDataUris,
        });

        if (result.brandInfo) {
          const { companyName, primaryColor, secondaryColor, contact } = result.brandInfo;
          if (companyName) setValue('companyName', companyName);
          if (primaryColor) setValue('primaryColor', primaryColor);
          if (secondaryColor) setValue('secondaryColor', secondaryColor);
          if (contact) {
            const contactString = [contact.name, contact.phone, contact.email].filter(Boolean).join('\n');
            setValue('contactInfo', contactString);
          }

           toast({
              title: "AI Extraction Complete!",
              description: result.summary,
           });
        } else {
             toast({
              title: "AI Analysis Complete",
              description: "The AI reviewed the documents but couldn't find all brand details. Please review and save.",
              variant: "destructive"
           });
        }
       
      } catch (error) {
         console.error("AI training failed:", error);
         toast({
            title: "An Error Occurred",
            description: "The AI was unable to process the documents. Please try again.",
            variant: "destructive"
         });
      } finally {
        setIsTraining(false);
        setSelectedFiles([]);
      }
  }

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Brand & Assets"
        description="Manage your brand identity and the files that form the Knowledge Base for your AI assistant."
        icon={<Palette className="h-8 w-8" />}
      />

      <Card>
        <CardHeader>
          <CardTitle>Your Brand Kit</CardTitle>
          <CardDescription>
            Provide your logo, colors, and contact information. The AI will use these assets to ensure everything it creates is perfectly on-brand.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
               <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                 <Controller
                    name="companyName"
                    control={control}
                    render={({ field }) => (
                      <Input id="companyName" {...field} placeholder="Your Company Name" />
                    )}
                  />
                 {errors.companyName && <p className="text-sm text-destructive">{errors.companyName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Company Logo</Label>
                <Controller
                  name="logo"
                  control={control}
                  render={({ field }) => (
                     <div 
                        className={cn(
                          "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/50 transition-colors",
                          isDragging && "border-primary bg-primary/10"
                        )}
                        onDragEnter={() => setIsDragging(true)}
                        onDragLeave={() => setIsDragging(false)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(false);
                          handleLogoFileChange(e.dataTransfer.files);
                        }}
                      >
                       <Input 
                        id="logo" 
                        type="file" 
                        accept="image/*" 
                        className="sr-only" 
                        onChange={(e) => handleLogoFileChange(e.target.files)}
                        ref={field.ref}
                      />
                       <label htmlFor="logo" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                         {logoPreview ? (
                            <Image src={logoPreview} alt="Logo preview" width={120} height={120} className="object-contain max-h-36 rounded-md" />
                         ) : (
                           <div className="text-center text-muted-foreground">
                             <Upload className="mx-auto h-10 w-10 mb-2" />
                             <p className="font-semibold">Click to upload or drag and drop</p>
                             <p className="text-xs">PNG, JPG, or SVG (max. 800x400px)</p>
                           </div>
                         )}
                       </label>
                    </div>
                  )}
                 />
                 {errors.logo && <p className="text-sm text-destructive">{errors.logo.message as string}</p>}
              </div>
            </div>
            
            <div className="space-y-4">
                <Label>Brand Colors</Label>
                <p className="text-sm text-muted-foreground">Select a color palette that best represents your brand.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {colorPalettes.map((palette) => (
                        <div
                            key={palette.name}
                            className={cn(
                                "relative rounded-lg p-4 cursor-pointer border-2 transition-all",
                                selectedPalette.name === palette.name ? "border-primary ring-2 ring-primary/50" : "border-muted hover:border-muted-foreground/50"
                            )}
                            onClick={() => handlePaletteSelect(palette)}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: palette.primary }}/>
                                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: palette.secondary }}/>
                            </div>
                            <p className="text-center text-sm font-medium mt-3">{palette.name}</p>
                            {selectedPalette.name === palette.name && (
                                <div className="absolute top-2 right-2 h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                      name="primaryColor"
                      control={control}
                      render={({ field }) => (
                         <div className="flex items-center gap-2">
                           <Label>Primary:</Label>
                           <Input {...field} type="text" className="w-32" />
                           <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: field.value }}></div>
                         </div>
                      )}
                    />
                  <Controller
                      name="secondaryColor"
                      control={control}
                      render={({ field }) => (
                         <div className="flex items-center gap-2">
                           <Label>Secondary:</Label>
                           <Input {...field} type="text" className="w-32" />
                           <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: field.value }}></div>
                         </div>
                      )}
                    />
                 </div>
            </div>

            <div className="space-y-2">
               <Label htmlFor="contactInfo">Contact Info</Label>
               <p className="text-sm text-muted-foreground">This will be added to rebranded brochures and other marketing materials.</p>
                <Controller
                    name="contactInfo"
                    control={control}
                    render={({ field }) => (
                      <Textarea id="contactInfo" {...field} placeholder="Your Name\nYour Phone\nYour Email" rows={4} />
                    )}
                  />
               {errors.contactInfo && <p className="text-sm text-destructive">{errors.contactInfo.message}</p>}
            </div>

             <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                   {isSubmitting ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Brand</>}
                </Button>
            </div>

          </CardContent>
        </form>
      </Card>

      <Separator className="my-8" />
      
      <Card>
        <CardHeader>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div>
                    <CardTitle>Asset Storage &amp; Knowledge Base</CardTitle>
                    <CardDescription>
                        Manage all your uploaded assets. This is the "Knowledge Base" that trains your AI assistant.
                    </CardDescription>
                </div>
                <div className='flex items-center gap-2 flex-wrap'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={handleTrainAssistant} disabled={selectedFiles.length === 0 || isTraining}>
                                    {isTraining ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                                    {isTraining ? 'Extracting...' : `Extract Brand Info from Selection`}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Select files and use the AI to populate your brand kit fields automatically.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                     <Button onClick={handleDeleteFiles} disabled={selectedFiles.length === 0} variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete ({selectedFiles.length})
                    </Button>
                    <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New File
                    </Button>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <label htmlFor='file-upload' className="sr-only">Upload file</label>
            <Input
                id="file-upload"
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleAssetFileUpload}
                multiple
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {files.map((file) => (
                <Card 
                    key={file.id} 
                    className={cn(
                        "group relative transition-all duration-200",
                        selectedFiles.includes(file.id) && "border-primary ring-2 ring-primary/50"
                    )}
                    onClick={() => handleSelectFile(file.id)}
                >
                    <div className="absolute top-2 right-2 z-10">
                        <Checkbox
                            checked={selectedFiles.includes(file.id)}
                            onCheckedChange={() => handleSelectFile(file.id)}
                            aria-label={`Select file ${file.name}`}
                        />
                    </div>
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center cursor-pointer">
                    <div className="mb-4">
                        {file.icon}
                    </div>
                    <p className="font-semibold text-sm truncate w-full" title={file.name}>{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                    </CardContent>
                    <CardFooter className="p-2 bg-muted/50 border-t flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); setFiles(fs => fs.filter(f => f.id !== file.id)); setSelectedFiles(sfs => sfs.filter(id => id !== file.id)) }}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </CardFooter>
                </Card>
                ))}
                 {files.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        <p>Your asset library is empty.</p>
                        <Button variant="link" onClick={() => fileInputRef.current?.click()}>Upload your first file</Button>
                    </div>
                )}
            </div>
        </CardContent>
      </Card>
    </main>
  );
}
