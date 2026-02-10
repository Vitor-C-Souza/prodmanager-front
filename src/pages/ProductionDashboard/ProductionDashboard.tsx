import React, { useState, useEffect } from 'react';
import { usePageTitle } from '../../hooks/usePageTitle';
import DashboardStats from './components/DashboardStats';
import ProductionCard from './components/ProductionCard';
import { productionService } from '../../service/productionService';
import { AlertCircle, Loader2 } from 'lucide-react';
import type { ProductionSimulation } from '../../types/productionSimulation';
import type { ProductionReport } from '../../types/productionReport';

const ProductionDashboard: React.FC = () => {
    usePageTitle('Dashboard');
    const [simulations, setSimulations] = useState<ProductionSimulation[]>([]);
    const [report, setReport] = useState<ProductionReport | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const [simulationData, reportData] = await Promise.all([
                    productionService.simulate(),
                    productionService.getReport()
                ]);

                setSimulations(simulationData);
                setReport(reportData);
            } catch (error) {
                console.error("Erro ao carregar dados do dashboard:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
                <p className="text-slate-500 font-medium">Calculating production possibilities...</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-black text-slate-900">Production Dashboard</h1>
                <p className="text-slate-500 mt-1">Real-time simulation based on current inventory</p>
            </header>

            <DashboardStats
                totalRevenue={report?.totalRevenue || 0}
                productCount={report?.productsCount || 0}
                totalUnits={report?.totalUnits || 0}
            />

            <section className="grid gap-6">
                {simulations.length > 0 ? (
                    simulations.map((item, index) => (
                        <ProductionCard
                            key={index}
                            name={item.product.name}
                            code={item.product.code}
                            unitPrice={item.price}
                            maxProduction={item.maxProduction}
                            totalRevenue={item.multiply}
                            materials={item.product.productRawMaterial?.map(prm => prm.rawMaterial) || []}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                        <AlertCircle className="text-slate-300 mb-4" size={48} />
                        <p className="text-slate-500 font-medium">No inventory available to produce any items.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ProductionDashboard;