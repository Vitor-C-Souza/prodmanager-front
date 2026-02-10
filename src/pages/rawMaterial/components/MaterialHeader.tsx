import React from 'react';
import { Plus } from 'lucide-react';

interface MaterialHeaderProps {
    onAddClick: () => void;
    isDisabled: boolean;
}

const MaterialHeader: React.FC<MaterialHeaderProps> = ({ onAddClick, isDisabled }) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Raw Materials
            </h1>
            <p className="text-slate-500 text-sm md:text-base font-medium">
                Manage your stock and base components
            </p>
        </div>

        <button
            onClick={onAddClick}
            disabled={isDisabled}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all shadow-xl shadow-blue-500/25 active:scale-95 shrink-0"
        >
            <div className="bg-white/20 p-1 rounded-lg">
                <Plus size={18} strokeWidth={3} />
            </div>
            <span className="tracking-wide">Add Material</span>
        </button>
    </div>
);

export default MaterialHeader;