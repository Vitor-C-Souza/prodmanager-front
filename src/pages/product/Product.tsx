import React, { useState, useEffect } from 'react';
import { productService } from '../../service/productService';
import type { CreateProductRequest, Product } from '../../types/product';
import ProductEmptyState from './components/ProductEmptyState';
import ProductModal from '../../components/product/ProductModal';
import ConfirmModal from '../../components/common/ConfirmModal';
import ProductHeader from './components/ProductHeader';
import ProductList from './components/ProductList';
import { usePageTitle } from '../../hooks/usePageTitle';

const Products: React.FC = () => {
    usePageTitle('Products');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [modals, setModals] = useState({ form: false, confirm: false });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [formData, setFormData] = useState<CreateProductRequest>({ name: '', code: '', price: 0 });

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const data = await productService.getProducts();
            setProducts(data);
        } catch (error) { console.error(error); }
        finally { setIsLoading(false); }
    };

    const handleOpenCreate = () => {
        setIsEditing(false);
        setFormData({ name: '', code: '', price: 0 });
        setModals({ ...modals, form: true });
    };

    const handleOpenEdit = (product: Product) => {
        setIsEditing(true);
        setSelectedId(product.id);
        setFormData({ name: product.name, code: product.code, price: product.price });
        setModals({ ...modals, form: true });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsActionLoading(true);
            isEditing && selectedId
                ? await productService.updateProduct(selectedId, formData)
                : await productService.createProduct(formData);
            setModals({ ...modals, form: false });
            fetchProducts();
        } catch (error) { alert("Error saving product."); }
        finally { setIsActionLoading(false); }
    };

    const handleConfirmDelete = async () => {
        if (!selectedId) return;
        try {
            setIsActionLoading(true);
            await productService.deleteProduct(selectedId);
            fetchProducts();
        } catch (error) { alert("Error deleting product."); }
        finally {
            setIsActionLoading(false);
            setModals({ ...modals, confirm: false });
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen">
            <ProductHeader onAddClick={handleOpenCreate} isDisabled={isLoading || isActionLoading} />

            {products.length === 0 && !isLoading ? (
                <ProductEmptyState onCreateClick={handleOpenCreate} />
            ) : (
                <ProductList
                    products={products}
                    isLoading={isLoading}
                    isActionLoading={isActionLoading}
                    onEdit={handleOpenEdit}
                    onDelete={(id) => { setSelectedId(id); setModals({ ...modals, confirm: true }); }}
                />
            )}

            <ProductModal
                isOpen={modals.form}
                isEditing={isEditing}
                isLoading={isActionLoading}
                onClose={() => setModals({ ...modals, form: false })}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
            />

            <ConfirmModal
                isOpen={modals.confirm}
                isLoading={isActionLoading}
                onClose={() => setModals({ ...modals, confirm: false })}
                onConfirm={handleConfirmDelete}
                title="Delete Product?"
                message="This action is permanent and cannot be undone."
            />
        </div>
    );
};

export default Products;