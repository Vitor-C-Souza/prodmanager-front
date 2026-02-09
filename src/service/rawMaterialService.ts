import api from './authService';
import type { RawMaterial, CreateRawMaterialRequest } from '../types/rawMaterial';

export const rawMaterialService = {
    getMaterials: async (): Promise<RawMaterial[]> => {
        const { data } = await api.get<RawMaterial[]>('/raw-materials');
        return data;
    },
    createMaterial: async (material: CreateRawMaterialRequest): Promise<RawMaterial> => {
        const { data } = await api.post<RawMaterial>('/raw-materials', material);
        return data;
    },
    updateMaterial: async (id: string, material: CreateRawMaterialRequest): Promise<RawMaterial> => {
        const { data } = await api.put<RawMaterial>(`/raw-materials/${id}`, material);
        return data;
    },
    updateStock: async (id: string, quantity: number): Promise<void> => {
        await api.patch(`/raw-materials/${id}/stock`, { quantity });
    },
    deleteMaterial: async (id: string): Promise<void> => {
        await api.delete(`/raw-materials/${id}`);
    }
};