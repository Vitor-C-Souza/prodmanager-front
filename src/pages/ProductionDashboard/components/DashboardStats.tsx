import React from 'react';
import { TrendingUp, Package, Layers } from 'lucide-react';

interface Props {
    totalRevenue: number;
    productCount: number;
    totalUnits: number;
}

const DashboardStats: React.FC<Props> = ({ totalRevenue, productCount, totalUnits }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
                <div className="bg-emerald-600 p-4 rounded-2xl text-white shadow-lg shadow-emerald-200">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Potential Revenue</p>
                    <p className="text-2xl font-black text-slate-800">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenue)}
                    </p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
                <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-200">
                    <Package size={24} />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Manufacturable Products</p>
                    <p className="text-2xl font-black text-slate-800">{productCount} items</p>
                </div>
            </div>


            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
                <div className="bg-purple-600 p-4 rounded-2xl text-white shadow-lg shadow-purple-200">
                    <Layers size={24} />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Unit Capacity</p>
                    <p className="text-2xl font-black text-slate-800">{totalUnits} units</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;