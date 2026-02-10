import React, { useState } from 'react';
import { X, Plus, Package, Loader2, Trash2 } from 'lucide-react';
import { productService } from '../../../service/productService';
import type { Product, ProductRawMaterial } from '../../../types/product';
import type { RawMaterial } from '../../../types/rawMaterial';

interface CompositionModalProps {
    isOpen: boolean;
    product: Product | null;
    materials: RawMaterial[];
    onClose: () => void;
    isLoading: boolean;
    onUpdate?: () => void;
}

const ModalHeader = ({ title, subtitle, onClose }: { title: string, subtitle: string, onClose: () => void }) => (
    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <div>
            <h2 className="text-xl font-black text-slate-900 leading-none">{title}</h2>
            <p className="text-sm text-blue-600 font-bold mt-1.5 uppercase tracking-wider">{subtitle}</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X size={20} />
        </button>
    </div>
);


const CompositionItem = ({ item, onRemove, isSubmitting }: { item: ProductRawMaterial, onRemove: (id: string) => void, isSubmitting: boolean }) => (
    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-100 transition-colors">
        <div className="flex items-center gap-3 min-w-0">
            <div className="bg-white p-2.5 rounded-xl shadow-sm text-blue-500 group-hover:scale-110 transition-transform">
                <Package size={20} />
            </div>
            <div className="min-w-0">
                <p className="font-bold text-slate-700 truncate">{item.rawMaterial.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity:</span>
                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {item.requiredQuantity}
                    </span>
                </div>
            </div>
        </div>
        <button
            onClick={() => onRemove(item.rawMaterial.id)}
            disabled={isSubmitting}
            className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
        </button>
    </div>
);

const CompositionModal: React.FC<CompositionModalProps> = ({
    isOpen, product, materials, onClose, onUpdate
}) => {
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [quantity, setQuantity] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const currentComposition = product?.productRawMaterial ?? [];
    const availableMaterials = (materials ?? []).filter(m =>
        !currentComposition.some(prm => prm.rawMaterial.id === m.id)
    );

    const handleAddMaterial = async () => {
        if (!product || !selectedMaterial || quantity <= 0) return;
        try {
            setIsSubmitting(true);
            await productService.addMaterialToProduct(product.id, selectedMaterial, quantity);
            setSelectedMaterial('');
            setQuantity(0);
            onUpdate?.();
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                <ModalHeader
                    title="Manage Composition"
                    subtitle={`${product.name} • ${product.code}`}
                    onClose={onClose}
                />

                <div className="p-6 overflow-y-auto space-y-8 custom-scrollbar">
                    <section className="space-y-5 bg-slate-50/50 p-5 rounded-3xl border border-slate-100">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Material</label>
                                <select
                                    className="w-full border-2 border-white rounded-2xl p-3.5 outline-none focus:border-blue-500 transition-all bg-white shadow-sm font-bold text-slate-700"
                                    value={selectedMaterial}
                                    onChange={(e) => setSelectedMaterial(e.target.value)}
                                >
                                    <option value="">Select...</option>
                                    {availableMaterials.map(m => (
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Quantity</label>
                                <input
                                    type="number"
                                    className="w-full border-2 border-white rounded-2xl p-3.5 outline-none focus:border-blue-500 transition-all bg-white shadow-sm font-bold text-slate-700"
                                    placeholder="0"
                                    value={quantity || ''}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleAddMaterial}
                            disabled={isSubmitting || !selectedMaterial || quantity <= 0}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <><Plus size={18} strokeWidth={3} /> Add to list</>}
                        </button>
                    </section>


                    <section>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">Current Composition</h3>
                        <div className="space-y-3">
                            {currentComposition.length > 0 ? (
                                currentComposition.map((item) => (
                                    <CompositionItem
                                        key={item.id}
                                        item={item}
                                        isSubmitting={isSubmitting}
                                        onRemove={onUpdate ? () => { } : () => { }}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-12 px-4 border-2 border-dashed border-slate-100 rounded-[2rem]">
                                    <Package className="mx-auto text-slate-200 mb-2" size={32} />
                                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Empty Composition</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CompositionModal;