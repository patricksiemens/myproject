import api from "../api/api";
import type {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "../types/product";

// Obtener productos (público)
export const getProducts = async (
  page = 1,
  limit = 5,
  search?: string,
  category?: string
) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  return api.get(`/products?${params.toString()}`);
};

// Obtener todas las categorías (para filtro)
export const getAllCategories = () => api.get<string[]>("/products/categories");

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
