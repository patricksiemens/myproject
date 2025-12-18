// Producto tal como viene del backend
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // el backend devuelve decimal como string a veces
  stock: number;
  category: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Payload para CREAR producto
export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
  isActive?: boolean;
}

// Payload para ACTUALIZAR producto (parcial)
export type UpdateProductPayload = Partial<CreateProductPayload>;
