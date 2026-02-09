import React from 'react';
import { Plus } from 'lucide-react';

interface MaterialHeaderProps {
    onAddClick: () => void;
    isDisabled: boolean;
}

const MaterialHeader: React.FC<MaterialHeaderProps> = ({ onAddClick, isDisabled }) => (
    <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Raw Materials</h1>
            <p className="text-slate-500 mt-1">Manage your stock and base components</p>
        </div>
        <button
            onClick={onAddClick}
            disabled={isDisabled}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
            <Plus size={20} /> Add Material
        </button>
    </div>
);

export default MaterialHeader;