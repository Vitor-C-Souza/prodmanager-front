import React, { useState } from 'react';
import { X, Plus, Package, Loader2, Trash2 } from 'lucide-react';
import { productService } from '../../../service/productService';
import type { Product } from '../../../types/product';
import type { RawMaterial } from '../../../types/rawMaterial';

interface CompositionModalProps {
    isOpen: boolean;
    product: Product | null;
    materials: RawMaterial[];
    onClose: () => void;
    isLoading: boolean;
    onUpdate?: () => void;
}

const CompositionModal: React.FC<CompositionModalProps> = ({
    isOpen, product, materials, onClose, onUpdate
}) => {
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [quantity, setQuantity] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filtra materiais que já não estejam na composição do produto
    const availableMaterials = materials.filter(m =>
        !product?.productRawMaterial?.some(prm => prm.rawMaterial.id === m.id)
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
            console.error("Error adding material:", error);
            alert("Failed to add material.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRemoveMaterial = async (relationshipId: string) => {
        if (!product || !window.confirm("Remove this material?")) return;
        try {
            setIsSubmitting(true);
            await productService.removeMaterialFromProduct(product.id, relationshipId);
            onUpdate?.();
        } catch (error) {
            console.error("Error removing material:", error);
            alert("Failed to remove material.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Manage Composition</h2>
                        <p className="text-sm text-blue-600 font-medium">{product.name} • {product.code}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-8">
                    {/* Form Section */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Raw Material</label>
                            <select
                                className="w-full border-2 border-slate-100 rounded-xl p-3 outline-none focus:border-blue-500 transition-all bg-slate-50"
                                value={selectedMaterial}
                                onChange={(e) => setSelectedMaterial(e.target.value)}
                            >
                                <option value="">Select a material...</option>
                                {availableMaterials.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Required Quantity</label>
                            <input
                                type="number"
                                className="w-full border-2 border-slate-100 rounded-xl p-3 outline-none focus:border-blue-500 transition-all bg-slate-50"
                                placeholder="0"
                                value={quantity || ''}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                        </div>

                        <button
                            onClick={handleAddMaterial}
                            disabled={isSubmitting || !selectedMaterial || quantity <= 0}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 disabled:shadow-none"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <><Plus size={20} /> Add to Composition</>}
                        </button>
                    </div>

                    {/* List Section */}
                    <div className="pt-6 border-t border-slate-100">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Current Composition</h3>
                        <div className="space-y-3">
                            {product.productRawMaterial && product.productRawMaterial.length > 0 ? (
                                product.productRawMaterial.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="bg-white p-2 rounded-lg shadow-sm flex-shrink-0">
                                                <Package className="text-blue-500" size={18} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-slate-700 truncate">{item.rawMaterial.name}</p>
                                                <p className="text-xs text-slate-400 font-medium">Qty: {item.requiredQuantity}</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveMaterial(item.rawMaterial.id)}
                                            disabled={isSubmitting}
                                            className="flex-shrink-0 ml-4 p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                                        >
                                            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 px-4 border-2 border-dashed border-slate-100 rounded-3xl text-slate-400">
                                    <p className="text-sm font-medium">No materials linked yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompositionModal;