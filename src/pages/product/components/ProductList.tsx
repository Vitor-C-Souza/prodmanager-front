import { Loader2 } from 'lucide-react';
import ProductCard from '../../../components/product/ProductCard';
import type { Product } from '../../../types/product';

interface Props {
    products: Product[];
    isLoading: boolean;
    isActionLoading: boolean;
    onEdit: (p: Product) => void;
    onDelete: (id: string) => void;
    onManageComposition: (p: Product) => void;
}

const ProductList = ({
    products,
    isLoading,
    isActionLoading,
    onEdit,
    onDelete,
    onManageComposition
}: Props) => {

    if (isLoading) return (
        <div className="flex flex-col items-center py-20 gap-4">
            <Loader2 className="animate-spin text-blue-600" size={40} />
            <p className="text-slate-500 font-medium">Loading catalog...</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {isActionLoading && (
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10 rounded-[2rem] flex items-center justify-center">
                    <Loader2 className="animate-spin text-blue-600" size={32} />
                </div>
            )}

            {products.map(p => (
                <ProductCard
                    key={p.id}
                    product={p}
                    onEdit={() => onEdit(p)}
                    onDelete={() => onDelete(p.id)}
                    onManageComposition={() => onManageComposition(p)}
                />
            ))}
        </div>
    );
};

export default ProductList;