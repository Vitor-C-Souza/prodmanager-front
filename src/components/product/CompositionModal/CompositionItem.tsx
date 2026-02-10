import { Package, Trash2, Loader2 } from 'lucide-react';
import type { ProductRawMaterial } from '../../../types/product';

interface Props {
    item: ProductRawMaterial;
    onRemove: (id: string) => void;
    isSubmitting: boolean;
}

export const CompositionItem = ({ item, onRemove, isSubmitting }: Props) => (
    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-100 transition-all">
        <div className="flex items-center gap-3 min-w-0">
            <div className="bg-white p-2.5 rounded-xl shadow-sm text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Package size={20} />
            </div>
            <div className="min-w-0">
                <p className="font-bold text-slate-700 truncate">{item.rawMaterial.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-nowrap">Req. Qty:</span>
                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {item.requiredQuantity}
                    </span>
                </div>
            </div>
        </div>
        <button
            onClick={() => onRemove(item.rawMaterial.id)}
            disabled={isSubmitting}
            className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all shrink-0"
        >
            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
        </button>
    </div>
);