import React from 'react';
import { DollarSign } from 'lucide-react';

interface DashboardStatsProps {
    totalRevenue: number;
    productCount: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ totalRevenue, productCount }) => (
    <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
        <div className="relative z-10">
            <div className="flex items-center gap-2 opacity-80 mb-2">
                <DollarSign size={20} />
                <span className="font-bold uppercase tracking-wider text-sm">Total Potential Revenue</span>
            </div>
            <div className="text-5xl font-black mb-1">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalRevenue)}
            </div>
            <p className="text-blue-100 font-medium text-sm">
                From {productCount} {productCount === 1 ? 'product' : 'products'}
            </p>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50" />
    </div>
);

export default DashboardStats;