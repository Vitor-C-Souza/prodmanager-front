import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { RawMaterial } from '../../../types/rawMaterial';
import MaterialCard from '../../../components/rawMaterial/MaterialCard';
import ConfirmModal from '../../../components/common/ConfirmModal';

interface MaterialListProps {
    materials: RawMaterial[];
    isLoading: boolean;
    isActionLoading: boolean;
    onEdit: (material: RawMaterial) => void;
    onDelete: (id: string) => void;
}

const MaterialList: React.FC<MaterialListProps> = ({
    materials, isLoading, isActionLoading, onEdit, onDelete
}) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setSelectedId(id);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedId) {
            onDelete(selectedId);
            setIsConfirmOpen(false);
            setSelectedId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="text-slate-500 font-medium">Loading inventory...</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-6 relative">
                {isActionLoading && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-2xl">
                        <Loader2 className="animate-spin text-blue-600" size={32} />
                    </div>
                )}

                {materials.map(material => (
                    <MaterialCard
                        key={material.id}
                        material={material}
                        onEdit={() => onEdit(material)}
                        onDelete={handleDeleteClick}
                    />
                ))}
            </div>

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                isLoading={isActionLoading}
                title="Delete Material"
                message="Are you sure you want to delete this raw material? This action is permanent and may affect linked products."
            />
        </>
    );
};

export default MaterialList;