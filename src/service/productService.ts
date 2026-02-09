import api from './authService';
import type { Product, CreateProductRequest } from '../types/product';

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    const { data } = await api.get<Product[]>('/products');
    return data;
  },

  createProduct: async (product: CreateProductRequest): Promise<Product> => {
    const { data } = await api.post<Product>('/products', product);
    return data;
  },

  updateProduct: async (id: string, product: CreateProductRequest): Promise<Product> => {
    const { data } = await api.put<Product>(`/products/${id}`, product);
    return data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};