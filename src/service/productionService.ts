import type { ProductionSimulation } from '../types/productionSimulation';
import api from './authService';


export const productionService = {
    simulate: async (): Promise<ProductionSimulation[]> => {
        const { data } = await api.get<ProductionSimulation[]>('/production/simulate');
        return data;
    }
};