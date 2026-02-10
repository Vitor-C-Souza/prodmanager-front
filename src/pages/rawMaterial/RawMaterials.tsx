import React, { useState, useEffect } from 'react';
import { rawMaterialService } from '../../service/rawMaterialService';
import { usePageTitle } from '../../hooks/usePageTitle';
import type { RawMaterial, CreateRawMaterialRequest } from '../../types/rawMaterial';

import MaterialHeader from './components/MaterialHeader';
import MaterialList from './components/MaterialList';
import MaterialEmptyState from './components/MaterialEmptyState';
import ConfirmModal from '../../components/common/ConfirmModal';
import RawMaterialModal from '../../components/rawMaterial/RawMaterialModal';

const RawMaterials: React.FC = () => {
    usePageTitle('Raw Materials');

    const [materials, setMaterials] = useState<RawMaterial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);

    const [modals, setModals] = useState({ form: false, confirm: false });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [formData, setFormData] = useState<CreateRawMaterialRequest>({
        name: '', code: '', stockQuantity: 0
    });

    useEffect(() => { fetchMaterials(); }, []);

    const fetchMaterials = async () => {
        try {
            setIsLoading(true);
            const data = await rawMaterialService.getMaterials();
            setMaterials(data);
        } catch (error) { console.error(error); }
        finally { setIsLoading(false); }
    };

    const handleOpenCreate = () => {
        setIsEditing(false);
        setFormData({ name: '', code: '', stockQuantity: 0 });
        setModals({ ...modals, form: true });
    };

    const handleOpenEdit = (m: RawMaterial) => {
        setIsEditing(true);
        setSelectedId(m.id);
        setFormData({ name: m.name, code: m.code, stockQuantity: 0 });
        setModals({ ...modals, form: true });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsActionLoading(true);
            if (isEditing && selectedId) {
                await Promise.all([
                    rawMaterialService.updateMaterial(selectedId, {
                        name: formData.name,
                        code: formData.code,
                        stockQuantity: 0
                    }),
                    rawMaterialService.updateStock(selectedId, formData.stockQuantity)
                ]);
            } else {
                await rawMaterialService.createMaterial(formData);
            }
            setModals({ ...modals, form: false });
            fetchMaterials();
        } catch (error) { alert("Error saving material."); }
        finally { setIsActionLoading(false); }
    };

    const handleConfirmDelete = async () => {
        if (!selectedId) return;
        try {
            setIsActionLoading(true);
            await rawMaterialService.deleteMaterial(selectedId);
            fetchMaterials();
        } catch (error) { alert("Error deleting."); }
        finally {
            setIsActionLoading(false);
            setModals({ ...modals, confirm: false });
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen">
            <MaterialHeader onAddClick={handleOpenCreate} isDisabled={isLoading || isActionLoading} />

            {materials.length === 0 && !isLoading ? (
                <MaterialEmptyState onCreateClick={handleOpenCreate} />
            ) : (
                <MaterialList
                    materials={materials}
                    isLoading={isLoading}
                    isActionLoading={isActionLoading}
                    onEdit={handleOpenEdit}
                    onDelete={(id) => { setSelectedId(id); setModals({ ...modals, confirm: true }); }}
                />
            )}

            <RawMaterialModal
                isOpen={modals.form}
                isEditing={isEditing}
                isLoading={isActionLoading}
                onClose={() => setModals({ ...modals, form: false })}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                currentBalance={materials.find(m => m.id === selectedId)?.stockQuantity || 0}
            />

            <ConfirmModal
                isOpen={modals.confirm}
                isLoading={isActionLoading}
                onClose={() => setModals({ ...modals, confirm: false })}
                onConfirm={handleConfirmDelete}
                title="Delete Material?"
                message="This action will remove the material from the database."
            />
        </div>
    );
};

export default RawMaterials;