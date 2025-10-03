
'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { DollarSign } from 'lucide-react';

/**
 * A dedicated widget for displaying financial analysis, tailored for the "Investor" persona.
 */
export function FinancialTable({ data }: { data: { price: number; rental: number; serviceFee: number; }}) {
    const yearlyRental = data.rental * 12;
    const netOperatingIncome = yearlyRental - data.serviceFee;
    const capRate = (netOperatingIncome / data.price) * 100;

    return (
        <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><DollarSign className="h-4 w-4 text-primary"/>Financial Snapshot</h3>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Asking Price</TableCell>
                        <TableCell className="text-right">AED {data.price.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Est. Annual Rental</TableCell>
                        <TableCell className="text-right">AED {yearlyRental.toLocaleString()}</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="font-medium">Est. Net Operating Income</TableCell>
                        <TableCell className="text-right">AED {netOperatingIncome.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Est. Capitalization Rate</TableCell>
                        <TableCell className="text-right font-bold text-primary">{capRate.toFixed(2)}%</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
