import React from 'react';
import { X, Loader2 } from 'lucide-react';
import type { CreateProductRequest } from '../../types/product';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    formData: CreateProductRequest;
    setFormData: (data: CreateProductRequest) => void;
    isEditing: boolean;
    isLoading: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
    isOpen, onClose, onSubmit, formData, setFormData, isEditing, isLoading
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center p-8 border-b border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-900">
                        {isEditing ? 'Edit Product' : 'New Product'}
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-50 rounded-full transition-all disabled:opacity-50"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="p-8 space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Product Name</label>
                        <input
                            disabled={isLoading}
                            className="w-full border border-slate-200 rounded-xl p-3.5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400"
                            placeholder="e.g. Industrial Engine"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Product Code</label>
                        <input
                            disabled={isLoading || isEditing}
                            className={`w-full border border-slate-200 rounded-xl p-3.5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-mono text-sm ${(isLoading || isEditing) ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : ''
                                }`}
                            placeholder="e.g. ENG-001"
                            value={formData.code}
                            onChange={e => setFormData({ ...formData, code: e.target.value })}
                            required
                        />
                        {isEditing && (
                            <p className="text-[10px] text-slate-400 mt-1 uppercase italic font-medium">
                                Code cannot be changed after creation
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Price (USD)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                            <input
                                type="number"
                                step="0.01"
                                disabled={isLoading}
                                className="w-full border border-slate-200 rounded-xl p-3.5 pl-8 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400"
                                placeholder="0.00"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 px-6 py-3.5 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center min-h-[56px]"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={24} />
                            ) : (
                                isEditing ? 'Update Product' : 'Save Product'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;