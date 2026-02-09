import React from 'react';
import { Pencil, Trash2, Box } from 'lucide-react';
import type { RawMaterial } from '../../types/rawMaterial';

interface MaterialCardProps {
    material: RawMaterial;
    onEdit: () => void;
    onDelete: (id: string) => void;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material, onEdit, onDelete }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex gap-4">
                    <div className="bg-slate-50 p-3 rounded-xl text-slate-400">
                        <Box size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">{material.name}</h3>
                        <p className="text-slate-500 text-sm font-mono uppercase">Code: {material.code}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button onClick={onEdit} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Pencil size={18} />
                    </button>
                    <button onClick={() => onDelete(material.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Stock</span>
                    <span className={`text-2xl font-bold ${material.stockQuantity > 10 ? 'text-slate-900' : 'text-orange-500'}`}>
                        {material.stockQuantity} <span className="text-sm font-medium text-slate-500 underline decoration-slate-200">units</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MaterialCard;