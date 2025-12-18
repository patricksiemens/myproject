import { useEffect, useState } from "react";
import type { Product, CreateProductPayload } from "../types/product";
import { createProduct, updateProduct } from "../services/productService";

type ProductFormProps = {
  product?: Product | null;
  onSave: () => void;
  onCancel: () => void;
};

export default function ProductForm({
  product,
  onSave,
  onCancel,
}: ProductFormProps) {
  const [form, setForm] = useState<CreateProductPayload>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    imageUrl: "",
    isActive: true,
  });

  // Inicializa el formulario solo cuando cambia el producto
  useEffect(() => {
    if (!product) return;

    const initForm = () => {
      setForm({
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: product.stock,
        category: product.category,
        imageUrl: product.imageUrl ?? "",
        isActive: product.isActive,
      });
    };

    // Ejecuta en el siguiente tick para evitar cascadas
    const id = setTimeout(initForm, 0);
    return () => clearTimeout(id);
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.description || !form.category) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    try {
      if (product) {
        await updateProduct(product.id, form);
      } else {
        await createProduct(form);
      }
      onSave();
    } catch (error) {
      console.error("Error guardando producto:", error);
      alert("Error al guardar producto");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {product ? "Editar producto" : "Nuevo producto"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="price"
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="category"
            placeholder="Categoría"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="imageUrl"
            placeholder="URL imagen"
            value={form.imageUrl}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {product ? "Actualizar" : "Crear"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
