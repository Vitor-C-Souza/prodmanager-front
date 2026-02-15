import React from 'react';
import { Settings, Pencil, Trash2, Package } from 'lucide-react';
import type { Product } from '../../types/product';

interface ProductCardProps {
    product: Product;
    onEdit: () => void;
    onDelete: (id: string) => void;
    onManageComposition: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product, onEdit, onDelete, onManageComposition
}) => {
    return (
        <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start gap-4">
                <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-black text-slate-800 capitalize leading-tight break-words">
                        {product.name}
                    </h3>
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">
                        ID: {product.code}
                    </p>
                </div>

                <div className="flex gap-1 shrink-0">
                    <button
                        onClick={() => onManageComposition(product)}
                        className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="Manage Composition"
                    >
                        <Settings size={18} />
                    </button>
                    <button
                        onClick={onEdit}
                        className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="Edit Product"
                        data-testid="edit-button"
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(product.id)}
                        data-testid="delete-button"
                        className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete Product"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <div className="my-6">
                <span className="text-3xl font-black text-emerald-600 italic">
                    ${product.price.toFixed(2)}
                </span>
            </div>

            <div className="pt-6 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Composition</p>
                <div className="flex flex-wrap gap-2">
                    {(product.productRawMaterial ?? []).length > 0 ? (
                        product.productRawMaterial?.map((item) => (
                            <div key={item.id} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
                                <Package size={12} className="text-blue-500" />
                                <span className="text-xs font-bold text-slate-700">{item.rawMaterial.name}</span>
                                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">x{item.requiredQuantity}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs italic text-slate-400">No materials defined.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;