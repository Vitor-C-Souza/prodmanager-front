import React from 'react';
import { Package, TrendingUp } from 'lucide-react';

interface RequiredMaterial {
    name: string;
    code: string;
    quantity: number;
}

interface ProductionCardProps {
    name: string;
    code: string;
    unitPrice: number;
    maxProduction: number;
    totalRevenue: number;
    materials: RequiredMaterial[];
}

const ProductionCard: React.FC<ProductionCardProps> = ({
    name, code, unitPrice, maxProduction, totalRevenue, materials
}) => (
    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden hover:shadow-md transition-all">
        <div className="p-6 flex justify-between items-center border-b border-slate-50">
            <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-2xl">
                    <Package className="text-blue-600" size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 capitalize">{name}</h3>
                    <p className="text-slate-400 text-xs font-mono">Code: {code}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Unit Price</p>
                <p className="text-xl font-bold text-slate-900">${unitPrice.toFixed(2)}</p>
            </div>
        </div>

        <div className="bg-slate-50/50 p-6 grid grid-cols-2 gap-8">
            <div className="space-y-1">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Max Production</p>
                <div className="flex items-center gap-2 text-emerald-600">
                    <TrendingUp size={20} />
                    <span className="text-2xl font-black">{maxProduction} units</span>
                </div>
            </div>
            <div className="space-y-1 text-right">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Revenue</p>
                <p className="text-2xl font-black text-emerald-600">${totalRevenue.toFixed(2)}</p>
            </div>
        </div>

        <div className="p-6">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Required Materials per Unit:</p>
            <div className="space-y-2">
                {materials.map((mat, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl bg-white">
                        <span className="text-sm font-bold text-slate-700">{mat.name} ({mat.code})</span>
                        <span className="text-sm text-slate-500 font-medium">{mat.quantity} units</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default ProductionCard;