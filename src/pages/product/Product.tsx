import React, { useState, useEffect } from 'react';
import { productService } from '../../service/productService';
import type { CreateProductRequest, Product } from '../../types/product';
import ProductEmptyState from './components/ProductEmptyState';
import ProductModal from '../../components/product/ProductModal';
import ConfirmModal from '../../components/common/ConfirmModal';
import ProductHeader from './components/ProductHeader';
import ProductList from './components/ProductList';
import { usePageTitle } from '../../hooks/usePageTitle';
import type { RawMaterial } from '../../types/rawMaterial';
import { rawMaterialService } from '../../service/rawMaterialService';
import CompositionModal from './components/CompositionModal';

const Products: React.FC = () => {
    usePageTitle('Products');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [formData, setFormData] = useState<CreateProductRequest>({ name: '', code: '', price: 0 });
    const [allMaterials, setAllMaterials] = useState<RawMaterial[]>([]);
    const [modals, setModals] = useState({ form: false, confirm: false, composition: false });
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => { fetchProducts(); }, []);

    useEffect(() => {
        const loadMaterials = async () => {
            const data = await rawMaterialService.getMaterials();
            setAllMaterials(data);
        };
        loadMaterials();
    }, []);

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

    const handleOpenComposition = (product: Product) => {
        setSelectedProduct(product);
        setModals({ ...modals, composition: true });
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
                    onDelete={handleConfirmDelete}
                    onManageComposition={handleOpenComposition}
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

            <CompositionModal
                isOpen={modals.composition}
                product={products.find(p => p.id === selectedProduct?.id) || selectedProduct}
                materials={allMaterials}
                onClose={() => setModals({ ...modals, composition: false })}
                isLoading={isLoading}
                onUpdate={fetchProducts}
            />
        </div>
    );
};

export default Products;