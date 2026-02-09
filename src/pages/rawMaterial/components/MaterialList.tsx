import React from 'react';
import { Loader2 } from 'lucide-react';
import type { RawMaterial } from '../../../types/rawMaterial';
import MaterialCard from '../../../components/rawMaterial/MaterialCard';

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
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="text-slate-500 font-medium">Loading inventory...</p>
            </div>
        );
    }

    return (
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
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default MaterialList;