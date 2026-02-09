import React from 'react';
import { Package } from 'lucide-react';

interface ProductEmptyStateProps {
    onCreateClick: () => void;
}

const ProductEmptyState: React.FC<ProductEmptyStateProps> = ({ onCreateClick }) => {
    return (
        <div className="bg-white border-2 border-dashed rounded-3xl p-20 text-center border-slate-200 shadow-sm animate-in fade-in zoom-in duration-300">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package size={40} className="text-slate-300" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
                No Products Yet
            </h3>

            <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                Your catalog is currently empty. Start by adding your first industrial product to manage its composition.
            </p>

            <button
                onClick={onCreateClick}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
            >
                Create First Product
            </button>
        </div>
    );
};

export default ProductEmptyState;