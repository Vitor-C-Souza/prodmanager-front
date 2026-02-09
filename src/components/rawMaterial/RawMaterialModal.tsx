import React from 'react';
import { X, Loader2, PlusCircle, MinusCircle, Package, Box } from 'lucide-react';
import type { CreateRawMaterialRequest } from '../../types/rawMaterial';

interface RawMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    formData: CreateRawMaterialRequest;
    setFormData: (data: CreateRawMaterialRequest) => void;
    isEditing: boolean;
    isLoading: boolean;
    currentBalance?: number;
}

const MaterialModal: React.FC<RawMaterialModalProps> = ({
    isOpen, onClose, onSubmit, formData, setFormData, isEditing, isLoading, currentBalance = 0
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center p-8 border-b border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-900">
                        {isEditing ? 'Adjust Inventory' : 'New Material'}
                    </h2>
                    <button onClick={onClose} disabled={isLoading} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-50 rounded-full transition-all disabled:opacity-50">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="p-8 space-y-5">
                    {isEditing && (
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Balance</p>
                                <p className="text-lg font-bold text-slate-700">{currentBalance} units</p>
                            </div>
                            <Box className="text-blue-500 opacity-20" size={32} />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Material Name</label>
                        <input
                            disabled={isLoading}
                            className="w-full border border-slate-200 rounded-xl p-3.5 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Material Code</label>
                        <input
                            disabled={isLoading || isEditing}
                            className="w-full border border-slate-200 rounded-xl p-3.5 font-mono text-sm disabled:bg-slate-50"
                            value={formData.code}
                            onChange={e => setFormData({ ...formData, code: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            {isEditing ? "Stock Movement (Qty to add/remove)" : "Initial Quantity"}
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                disabled={isLoading}
                                className={`w-full border-2 rounded-xl p-4 pl-12 outline-none transition-all font-bold text-lg
                                    ${isEditing ? 'border-blue-50 focus:border-blue-500' : 'border-slate-200 focus:border-blue-500'}`}
                                value={formData.stockQuantity}
                                onChange={e => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                                required
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                {isEditing ? (
                                    formData.stockQuantity >= 0
                                        ? <PlusCircle className="text-green-500" size={24} />
                                        : <MinusCircle className="text-red-500" size={24} />
                                ) : (
                                    <Package className="text-slate-400" size={24} />
                                )}
                            </div>
                        </div>
                        {isEditing && (
                            <p className={`text-[11px] mt-2 font-bold px-2 py-1 rounded-md inline-block ${formData.stockQuantity >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {formData.stockQuantity >= 0 ? '↑ INCREASE STOCK' : '↓ DECREASE STOCK'}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button type="button" onClick={onClose} disabled={isLoading} className="flex-1 px-6 py-3.5 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50">Cancel</button>
                        <button type="submit" disabled={isLoading} className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 shadow-lg flex items-center justify-center min-h-[56px]">
                            {isLoading ? <Loader2 className="animate-spin" size={24} /> : (isEditing ? 'Apply Adjustment' : 'Save Material')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MaterialModal;