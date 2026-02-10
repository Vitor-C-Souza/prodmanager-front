import type { ProductionReport } from '../types/productionReport';
import type { ProductionSimulation } from '../types/productionSimulation';
import api from './authService';


export const productionService = {
    simulate: async (): Promise<ProductionSimulation[]> => {
        const { data } = await api.get<ProductionSimulation[]>('/production/simulate');
        return data;
    },
    getReport: async (): Promise<ProductionReport> => {
        const response = await api.get('/production/report');
        return response.data;
    }
};