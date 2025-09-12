'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, Wallet, Building, Bed, Bath, Ruler, Calendar, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { estimatePrice } from '@/ai/flows/estimate-price';
import { EstimatePriceInput, EstimatePriceOutput } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { track } from '@/lib/events';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EstimatePriceInputSchema } from '@/types';


const ResultDisplay = ({ result }: { result: EstimatePriceOutput }) => {
    return (
        <Card>
            <CardHeader className="text-center">
                <CardDescription>AI-Powered Estimate</CardDescription>
                <CardTitle className="text-5xl font-bold text-primary">
                    AED {result.estimatedPrice.toLocaleString()}
                </CardTitle>
                <CardDescription>
                    Likely range: AED {result.confidenceRange.lowerBound.toLocaleString()} - AED {result.confidenceRange.upperBound.toLocaleString()}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <h4 className="font-semibold mb-2">Comparable Sales Analysis</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    {result.comparableSales.map((sale, index) => (
                        <li key={index} className="p-2 bg-muted/50 rounded-md border text-xs">
                           {sale}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};


export default function PriceEstimatorPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<EstimatePriceOutput | null>(null);

    const { control, handleSubmit, formState: { errors } } = useForm<EstimatePriceInput>({
        resolver: zodResolver(EstimatePriceInputSchema),
        defaultValues: {
            location: '',
            propertyType: undefined,
            bedrooms: 1,
            bathrooms: 1,
            squareFootage: 1000,
            age: 5,
            condition: undefined,
        },
    });

    const handleGeneration = async (data: EstimatePriceInput) => {
        setIsLoading(true);
        setResult(null);
        track('price_estimation_started', { location: data.location });

        try {
            const payload: EstimatePriceInput = {
                ...data,
                bedrooms: Number(data.bedrooms),
                bathrooms: Number(data.bathrooms),
                squareFootage: Number(data.squareFootage),
                age: Number(data.age),
            };
            
            const responseData = await estimatePrice(payload);
            setResult(responseData);
            track('price_estimation_succeeded');
            toast({ title: 'Price Estimated!', description: 'Your AI-powered property valuation is ready.' });
        } catch (e: any) {
            console.error(e);
            toast({
                title: "Estimation Failed",
                description: e.message,
                variant: 'destructive',
            });
            track('price_estimation_failed', { error: e.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="AI Price Estimator"
                description="Get an AI-powered price estimate for any property in seconds."
                icon={<Wallet className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                    <Card>
                        <form onSubmit={handleSubmit(handleGeneration)}>
                            <CardHeader>
                                <CardTitle>Property Details</CardTitle>
                                <CardDescription>Provide the details of the property to estimate.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Controller name="location" control={control} render={({ field }) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="location"><Building className="inline-block mr-2 h-4 w-4" />Location</Label>
                                        <Input id="location" {...field} placeholder="e.g., Dubai Marina" />
                                        {errors.location && <p className="text-destructive text-xs">{errors.location.message}</p>}
                                    </div>
                                )}/>
                                <Controller name="propertyType" control={control} render={({ field }) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="propertyType"><Building className="inline-block mr-2 h-4 w-4" />Property Type</Label>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Apartment">Apartment</SelectItem>
                                                <SelectItem value="Villa">Villa</SelectItem>
                                                <SelectItem value="Townhouse">Townhouse</SelectItem>
                                                <SelectItem value="Penthouse">Penthouse</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.propertyType && <p className="text-destructive text-xs">{errors.propertyType.message}</p>}
                                    </div>
                                )}/>
                                 <div className="grid grid-cols-2 gap-4">
                                     <Controller name="bedrooms" control={control} render={({ field }) => (
                                        <div className="space-y-2">
                                            <Label htmlFor="bedrooms"><Bed className="inline-block mr-1 h-4 w-4" />Beds</Label>
                                            <Input id="bedrooms" type="number" {...field} />
                                            {errors.bedrooms && <p className="text-destructive text-xs">{errors.bedrooms.message}</p>}
                                        </div>
                                    )}/>
                                     <Controller name="bathrooms" control={control} render={({ field }) => (
                                        <div className="space-y-2">
                                            <Label htmlFor="bathrooms"><Bath className="inline-block mr-1 h-4 w-4" />Baths</Label>
                                            <Input id="bathrooms" type="number" {...field} />
                                            {errors.bathrooms && <p className="text-destructive text-xs">{errors.bathrooms.message}</p>}
                                        </div>
                                    )}/>
                                 </div>
                                  <Controller name="squareFootage" control={control} render={({ field }) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="squareFootage"><Ruler className="inline-block mr-2 h-4 w-4" />Square Footage</Label>
                                        <Input id="squareFootage" type="number" {...field} placeholder="e.g., 1500" />
                                        {errors.squareFootage && <p className="text-destructive text-xs">{errors.squareFootage.message}</p>}
                                    </div>
                                )}/>
                                <div className="grid grid-cols-2 gap-4">
                                <Controller name="age" control={control} render={({ field }) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="age"><Calendar className="inline-block mr-1 h-4 w-4" />Age (Yrs)</Label>
                                        <Input id="age" type="number" {...field} />
                                         {errors.age && <p className="text-destructive text-xs">{errors.age.message}</p>}
                                    </div>
                                )}/>
                                <Controller name="condition" control={control} render={({ field }) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="condition"><Star className="inline-block mr-1 h-4 w-4" />Condition</Label>
                                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="New">New</SelectItem>
                                                <SelectItem value="Upgraded">Upgraded</SelectItem>
                                                <SelectItem value="Standard">Standard</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.condition && <p className="text-destructive text-xs">{errors.condition.message}</p>}
                                    </div>
                                )}/>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Estimating...</> : <><Sparkles className="mr-2 h-5 w-5" />Estimate Price</>}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    {isLoading ? (
                        <Card className="flex items-center justify-center h-96">
                            <div className="text-center text-muted-foreground">
                                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
                                <p className="font-semibold">AI is analyzing the market data...</p>
                                <p className="text-sm">This may take a moment.</p>
                            </div>
                        </Card>
                    ) : result ? (
                        <ResultDisplay result={result} />
                    ) : (
                        <Card className="flex flex-col items-center justify-center h-96 border-dashed text-center p-6">
                            <Wallet className="h-16 w-16 mx-auto mb-4 opacity-10" />
                            <h3 className="text-lg font-semibold text-foreground">Your Price Estimate Will Appear Here</h3>
                            <p className="text-muted-foreground">Fill out the property details and let the AI generate a market valuation.</p>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
