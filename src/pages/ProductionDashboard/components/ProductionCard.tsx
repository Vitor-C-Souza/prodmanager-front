import React from 'react';
import { Package, TrendingUp, Layers } from 'lucide-react';
import type { RawMaterial } from '../../../types/rawMaterial';

interface ProductionCardProps {
    name: string;
    code: string;
    unitPrice: number;
    maxProduction: number;
    totalRevenue: number;
    materials: RawMaterial[];
}

const ProductionCard: React.FC<ProductionCardProps> = ({
    name, code, unitPrice, maxProduction, totalRevenue, materials
}) => (
    <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden hover:shadow-xl transition-all group max-w-full">

        <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4 md:gap-5">
                <div className="bg-blue-50 p-4 rounded-3xl group-hover:bg-blue-600 transition-colors duration-300 shrink-0">
                    <Package className="text-blue-600 group-hover:text-white" size={28} />
                </div>
                <div className="min-w-0">
                    <h3 className="text-xl md:text-2xl font-black text-slate-800 capitalize truncate leading-tight">
                        {name}
                    </h3>
                    <span className="inline-block mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        ID: {code}
                    </span>
                </div>
            </div>

            <div className="w-full md:w-auto flex md:flex-col justify-between items-end border-t md:border-t-0 border-slate-50 pt-4 md:pt-0">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest md:mb-1">Unit Price</p>
                <p className="text-xl md:text-2xl font-black text-slate-900 italic">
                    ${unitPrice.toFixed(2)}
                </p>
            </div>
        </div>

        <div className="mx-6 md:mx-8 p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100/50 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start space-y-1 w-full md:w-auto">
                <p className="text-[11px] font-bold text-blue-600/70 uppercase tracking-widest">Maximum Yield</p>
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-500 p-1.5 rounded-full shrink-0">
                        <TrendingUp size={16} className="text-white" />
                    </div>
                    <span className="text-3xl font-black text-slate-900">{maxProduction}</span>
                    <span className="text-sm font-bold text-slate-500 uppercase">Units</span>
                </div>
            </div>

            <div className="hidden md:block h-12 w-px bg-blue-200/50"></div>

            <div className="flex flex-col items-center md:items-end space-y-1 w-full md:w-auto">
                <p className="text-[11px] font-bold text-blue-600/70 uppercase tracking-widest">Projected Revenue</p>
                <p className="text-3xl font-black text-emerald-600">
                    ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
            </div>
        </div>

        <div className="p-6 md:p-8 pt-6">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <Layers size={16} className="text-slate-400" />
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        Composition Inventory
                    </h4>
                </div>
                <div className="h-px flex-1 mx-4 bg-slate-100"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {materials.map((mat, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                        <div className="flex items-center gap-3 truncate">
                            <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0"></div>
                            <span className="text-xs font-bold text-slate-700 truncate">{mat.name}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Stock:</span>
                            <span className="text-xs font-black text-blue-600">{mat.stockQuantity}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default ProductionCard;