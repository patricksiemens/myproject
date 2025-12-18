import api from "../api/api";
import type {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "../types/product";

// Obtener productos (público)
export const getProducts = () => api.get<Product[]>("/products");

// Obtener un producto
export const getProductById = (id: number) =>
  api.get<Product>(`/products/${id}`);

// Crear producto (admin)
export const createProduct = (data: CreateProductPayload) =>
  api.post<Product>("/products", data);

// Actualizar producto (admin)
export const updateProduct = (id: number, data: UpdateProductPayload) =>
  api.put<Product>(`/products/${id}`, data);

// Borrado lógico (admin)
export const deleteProduct = (id: number) =>
  api.delete<void>(`/products/${id}`);
