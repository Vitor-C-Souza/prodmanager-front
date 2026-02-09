export interface RawMaterial {
    id: string;
    name: string;
    code: string;
    stockQuantity: number;
}

export interface CreateRawMaterialRequest {
    name: string;
    code: string;
    stockQuantity: number;
}