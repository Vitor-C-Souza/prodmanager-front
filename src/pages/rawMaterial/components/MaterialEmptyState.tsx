import React from 'react';
import { Database } from 'lucide-react';

interface MaterialEmptyStateProps {
    onCreateClick: () => void;
}

const MaterialEmptyState: React.FC<MaterialEmptyStateProps> = ({ onCreateClick }) => (
    <div className="bg-white border-2 border-dashed rounded-3xl p-20 text-center border-slate-200 shadow-sm">
        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Database size={40} className="text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No Materials Found</h3>
        <p className="text-slate-500 mb-8 max-w-xs mx-auto">Your inventory is empty. Register your first raw material to start managing stock.</p>
        <button
            onClick={onCreateClick}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md"
        >
            Register Material
        </button>
    </div>
);

export default MaterialEmptyState;