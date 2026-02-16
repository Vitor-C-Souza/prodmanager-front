import React, { useState } from 'react';
import { Plus, Loader2, Package } from 'lucide-react';
import { productService } from '../../../service/productService';
import { ModalHeader } from './ModalHeader';
import { CompositionItem } from './CompositionItem';// Certifique-se que o path está correto
import type { Product } from '../../../types/product';
import type { RawMaterial } from '../../../types/rawMaterial';
import ConfirmModal from '../../common/ConfirmModal';

interface Props {
    isOpen: boolean;
    product: Product | null;
    materials: RawMaterial[];
    onClose: () => void;
    onUpdate?: () => void;
    isLoading: boolean;
}

const CompositionModal: React.FC<Props> = ({
    isOpen, product, materials, onClose, onUpdate, isLoading
}) => {
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [quantity, setQuantity] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Estados para o Modal de Confirmação
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    if (!isOpen || !product) return null;

    const currentComposition = product.productRawMaterial ?? [];
    const availableMaterials = (materials ?? []).filter(m =>
        !currentComposition.some(prm => prm.rawMaterial.id === m.id)
    );

    const handleAdd = async () => {
        if (!selectedMaterial || quantity <= 0) return;
        try {
            setIsSubmitting(true);
            await productService.addMaterialToProduct(product.id, selectedMaterial, quantity);
            setSelectedMaterial('');
            setQuantity(0);
            onUpdate?.();
        } finally {
            setIsSubmitting(false);
        }
    };

    // 1. Esta função apenas ABRE o modal de confirmação
    const handleRequestRemove = (relationshipId: string) => {
        setItemToDelete(relationshipId);
        setIsConfirmOpen(true);
    };

    // 2. Esta função é a que REALMENTE deleta, chamada pelo ConfirmModal
    const handleConfirmRemove = async () => {
        if (!itemToDelete) return;
        try {
            setIsSubmitting(true);
            await productService.removeMaterialFromProduct(product.id, itemToDelete);
            onUpdate?.();
        } finally {
            setIsSubmitting(false);
            setIsConfirmOpen(false);
            setItemToDelete(null);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                    <ModalHeader
                        title="Manage Composition"
                        subtitle={`${product.name} • ${product.code}`}
                        onClose={onClose}
                    />

                    <div className="p-6 overflow-y-auto space-y-8 custom-scrollbar relative">
                        {isLoading && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex items-center justify-center">
                                <Loader2 className="animate-spin text-blue-600" size={32} />
                            </div>
                        )}

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
                                onClick={handleAdd}
                                disabled={isSubmitting || isLoading || !selectedMaterial || quantity <= 0}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <><Plus size={18} strokeWidth={3} /> Add to list</>}
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
                                            onRemove={handleRequestRemove}
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

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmRemove}
                isLoading={isSubmitting}
                title="Remove Item"
                message="Are you sure you want to remove this material from the composition?"
            />
        </>
    );
};

export default CompositionModal;