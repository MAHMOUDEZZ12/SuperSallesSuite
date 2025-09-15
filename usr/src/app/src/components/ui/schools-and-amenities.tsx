
'use client';
import { School, MapPin } from 'lucide-react';

/**
 * A dedicated widget for displaying lifestyle data, tailored for the "Homebuyer" persona.
 */
export function SchoolsAndAmenities({ data }: { data: { rating: string; distance: string; }}) {
    return (
         <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><MapPin className="h-4 w-4 text-primary"/>Neighborhood Score</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                    <School className="h-6 w-6 text-primary mx-auto mb-1"/>
                    <p className="text-sm text-muted-foreground">Top School Rating</p>
                    <p className="font-bold text-lg">{data.rating}</p>
                </div>
                 <div className="p-4 bg-muted rounded-lg text-center">
                    <MapPin className="h-6 w-6 text-primary mx-auto mb-1"/>
                    <p className="text-sm text-muted-foreground">Distance from Center</p>
                    <p className="font-bold text-lg">{data.distance}</p>
                </div>
            </div>
        </div>
    );
}
