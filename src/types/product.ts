export interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
}

export type CreateProductRequest = Omit<Product, 'id'>;