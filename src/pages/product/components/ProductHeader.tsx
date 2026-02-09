import { Plus } from 'lucide-react';

export const ProductHeader = ({ onAddClick, isDisabled }: { onAddClick: () => void, isDisabled: boolean }) => (
    <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-900">Products Catalog</h1>
            <p className="text-slate-500 mt-1">Inventory and compositions</p>
        </div>
        <button onClick={onAddClick} disabled={isDisabled} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-lg transition-all active:scale-95 disabled:bg-blue-400">
            <Plus size={20} /> Add Product
        </button>
    </div>
);
export default ProductHeader;