import type { Product } from "./product";

export interface ProductionSimulation {
    product: Product;
    maxProduction: number;
    price: number;
    multiply: number;
}