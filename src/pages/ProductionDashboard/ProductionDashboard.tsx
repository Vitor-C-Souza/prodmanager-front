import React, { useState, useEffect } from 'react';
import { usePageTitle } from '../../hooks/usePageTitle';
import DashboardStats from './components/DashboardStats';
import ProductionCard from './components/ProductionCard';
import { productionService } from '../../service/productionService';
import { AlertCircle, Loader2 } from 'lucide-react';
import type { ProductionSimulation } from '../../types/productionSimulation';

const ProductionDashboard: React.FC = () => {
    usePageTitle('Production Dashboard');
    const [simulations, setSimulations] = useState<ProductionSimulation[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const data = await productionService.simulate();
                setSimulations(data);
            } catch (error) {
                console.error("Erro ao carregar simulação:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const totalPotentialRevenue = simulations.reduce((acc, curr) => acc + curr.multiply, 0);
    const manufacturableCount = simulations.filter(p => p.maxProduction > 0).length;

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
                <p className="text-slate-500 mt-1">Products you can manufacture with current inventory</p>
            </header>

            <DashboardStats
                totalRevenue={totalPotentialRevenue}
                productCount={manufacturableCount}
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
                        <p className="text-slate-500 font-medium">No simulation data available.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ProductionDashboard;