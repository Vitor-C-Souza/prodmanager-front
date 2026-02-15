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
        <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all group relative">

            <div className="flex items-start gap-4 pr-16">
                <div className="bg-slate-50 p-3 rounded-2xl text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                    <Box size={24} />
                </div>
                <div className="min-w-0">
                    <h3 className="text-xl font-black text-slate-800 capitalize truncate">
                        {material.name}
                    </h3>
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                        ID: {material.code}
                    </p>
                </div>
            </div>

            <div className="absolute top-6 right-6 flex gap-1">
                <button
                    onClick={onEdit}
                    data-testid="edit-material-button"
                    className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                >
                    <Pencil size={18} />
                </button>
                <button
                    onClick={() => onDelete(material.id)}
                    data-testid="delete-material-button"
                    className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="my-6 h-px bg-slate-100" />

            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Current Inventory
                </p>
                <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-black ${material.stockQuantity > 10 ? 'text-slate-900' : 'text-orange-500'
                        }`}>
                        {material.stockQuantity}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase">
                        Units
                    </span>
                </div>
            </div>

            {material.stockQuantity <= 10 && (
                <div className="absolute bottom-6 right-6 px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-black uppercase rounded-full border border-orange-100">
                    Low Stock
                </div>
            )}
        </div>
    );
};

export default MaterialCard;