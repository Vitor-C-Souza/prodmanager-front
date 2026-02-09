import React from 'react';
import { Settings, Pencil, Trash2 } from 'lucide-react';
import type { Product } from '../../types/product';

interface ProductCardProps {
    product: Product;
    onEdit: () => void;
    onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 capitalize">{product.name}</h3>
                    <p className="text-slate-500 text-sm mt-1 font-mono">Code: {product.code}</p>
                </div>

                <div className="flex gap-3 text-slate-400">
                    <button className="hover:text-slate-600 transition-colors p-1" title="Materials Settings">
                        <Settings size={20} />
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

            <div className="pt-4 border-t border-slate-100">
                <p className="text-slate-400 italic text-sm">
                    No materials defined. Click the settings icon to add materials.
                </p>
            </div>
        </div>
    );
};

export default ProductCard;