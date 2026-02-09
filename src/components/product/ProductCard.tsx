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
    product,
    onEdit,
    onDelete,
    onManageComposition
}) => {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 capitalize">{product.name}</h3>
                    <p className="text-slate-500 text-sm mt-1 font-mono">Code: {product.code}</p>
                </div>

                <div className="flex gap-3 text-slate-400">
                    <button
                        onClick={() => onManageComposition(product)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Manage Composition"
                    >
                        <Settings size={18} />
                    </button>

                    <button
                        onClick={onEdit}
                        className="hover:text-blue-600 transition-colors p-1"
                        title="Edit Product"
                    >
                        <Pencil size={20} />
                    </button>

                    <button
                        onClick={() => onDelete(product.id)}
                        className="hover:text-red-600 transition-colors p-1"
                        title="Delete Product"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            <div className="my-4">
                <span className="text-2xl font-bold text-emerald-600">
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(product.price)}
                </span>
            </div>

            {/* Seção de Composição Atualizada */}
            <div className="pt-4 border-t border-slate-100">
                {product.productRawMaterial && product.productRawMaterial.length > 0 ? (
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                            Composition
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {product.productRawMaterial.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full"
                                >
                                    <Package size={12} className="text-blue-500" />
                                    <span className="text-xs font-bold text-slate-700">
                                        {item.rawMaterial.name}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono">
                                        x{item.requiredQuantity}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-slate-400 italic text-sm">
                        No materials defined. Click the settings icon to add materials.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;