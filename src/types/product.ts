import type { RawMaterial } from "./rawMaterial";

export interface ProductRawMaterial {
  id: string;
  rawMaterial: RawMaterial;
  requiredQuantity: number;
}

export interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  productRawMaterial?: ProductRawMaterial[];
}

export type CreateProductRequest = Omit<Product, 'id' | 'productRawMaterial'>;