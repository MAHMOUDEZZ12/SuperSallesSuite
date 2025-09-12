
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { LineChart, Users2, Eye, Target, Sparkles, Download, ArrowRight, BarChart as BarChartIcon } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const mockPerformanceData = [
    { name: 'Emaar Beachfront', views: 4800, leads: 218, conversion: 4.54 },
    { name: 'Damac Hills 2', views: 3200, leads: 140, conversion: 4.38 },
    { name: 'Sobha Hartland', views: 2500, leads: 95, conversion: 3.80 },
    { name: 'Arabian Ranches', views: 1800, leads: 50, conversion: 2.78 },
    { name: 'Dubai Marina', views: 1500, leads: 65, conversion: 4.33 },
    { name: 'JVC', views: 1200, leads: 88, conversion: 7.33 },
];

export default function ListingPerformancePage() {
    const [timeRange, setTimeRange] = useState('30d');
    const { toast } = useToast();

    const chartData = mockPerformanceData.slice(0, 5).map(d => ({ name: d.name, Views: d.views }));
    
    const kpiData = {
        totalViews: mockPerformanceData.reduce((sum, d) => sum + d.views, 0),
        uniqueVisitors: mockPerformanceData.reduce((sum, d) => sum + d.views, 0) * 0.78, // mock
        leadsGenerated: mockPerformanceData.reduce((sum, d) => sum + d.leads, 0),
    };
    
    const handleApplySuggestion = () => {
        toast({
            title: "Suggestion Applied!",
            description: "The listing title has been updated across relevant portals."
        });
    }


    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Listing Performance"
                description="Track views, visitors, and lead generation for your listings across all portals."
                icon={<BarChartIcon className="h-8 w-8" />}
            >
                 <div className="flex items-center gap-2">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                            <SelectItem value="30d">Last 30 Days</SelectItem>
                            <SelectItem value="90d">Last 90 Days</SelectItem>
                            <SelectItem value="all">All Time</SelectItem>
                        </SelectContent>
                    </Select>
                     <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Report</Button>
                 </div>
            </PageHeader>
            
            <div className="grid gap-6 md:grid-cols-3">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.totalViews.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                        <Users2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{Math.floor(kpiData.uniqueVisitors).toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground"><Badge variant="destructive" className="mr-1">-5%</Badge> Bot traffic filtered</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Leads Generated</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.leadsGenerated.toLocaleString()}</div>
                         <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Top Performing Listings by Views</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                                <Bar dataKey="Views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>AI-Powered Recommendations</CardTitle>
                        <CardDescription>Actionable insights to boost your performance.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-3 bg-primary/10 rounded-lg space-y-2">
                            <h4 className="font-semibold text-primary">Prioritization Alert</h4>
                            <p className="text-sm text-primary/90">
                               Reports show high search volume for 'Dubai Marina' on Property Finder. Prioritizing your 'Emaar Beachfront' listing could increase views by up to 40%.
                            </p>
                            <Link href="/dashboard/tool/listing-manager">
                                <Button size="sm" variant="secondary" className="w-full">
                                    Manage Emaar Beachfront Listing <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </Link>
                        </div>
                         <div className="p-3 bg-secondary rounded-lg space-y-2">
                            <h4 className="font-semibold text-secondary-foreground">Optimization Suggestion</h4>
                            <p className="text-sm text-muted-foreground">
                                The title for your 'Damac Hills 2' listing is underperforming. We recommend changing it to: <span className="font-semibold italic">"Spacious 3BR Villa with Lake View & Upgraded Interiors"</span>.
                            </p>
                            <Button size="sm" variant="outline" className="w-full" onClick={handleApplySuggestion}>
                                Roll-in this change now
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Listings Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Listing Name</TableHead>
                                <TableHead>Total Views</TableHead>
                                <TableHead>Leads Generated</TableHead>
                                <TableHead>Lead Conversion Rate</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockPerformanceData.map((listing) => (
                                <TableRow key={listing.name}>
                                    <TableCell className="font-medium">{listing.name}</TableCell>
                                    <TableCell>{listing.views.toLocaleString()}</TableCell>
                                    <TableCell>{listing.leads.toLocaleString()}</TableCell>
                                    <TableCell className="font-semibold text-primary">{listing.conversion.toFixed(2)}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
    );
}
