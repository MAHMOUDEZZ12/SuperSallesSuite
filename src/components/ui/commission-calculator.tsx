
'use client';
import { Handshake } from 'lucide-react';

/**
 * A dedicated widget for calculating potential commission, tailored for the "Broker" persona.
 */
export function CommissionCalculator({ data }: { data: { salePrice: number; commissionRate: number; }}) {
    const commission = data.salePrice * (data.commissionRate / 100);

    return (
         <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><Handshake className="h-4 w-4 text-primary"/>Deal Potential</h3>
            <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Est. Commission at {data.commissionRate}%</p>
                <p className="text-3xl font-bold text-primary">AED {commission.toLocaleString()}</p>
            </div>
        </div>
    );
}
