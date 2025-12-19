import { useEffect, useState } from "react";
import type { Product, CreateProductPayload } from "../types/product";
import { createProduct, updateProduct } from "../services/productService";
import Toast from "./Toast";
import { useToast } from "../hooks/useToast";

type ProductFormProps = {
  product?: Product | null;
  onSave: () => void;
  onCancel: () => void;
};

const emptyForm: CreateProductPayload = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  category: "",
  imageUrl: "",
  isActive: true,
};

export default function ProductForm({
  product,
  onSave,
  onCancel,
}: ProductFormProps) {
  const [form, setForm] = useState<CreateProductPayload>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  // 🔹 Solo para modo EDIT
  useEffect(() => {
    if (!product) return;

    setForm({
      name: product.name,
      description: product.description,
      price: Number(product.price),
      stock: product.stock,
      category: product.category,
      imageUrl: product.imageUrl ?? "",
      isActive: product.isActive,
    });
  }, [product]);

  const resetForm = () => {
    setForm(emptyForm);
  };

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
      showToast("Please complete all required fields", "error");
      return;
    }

    try {
      setIsSubmitting(true);

      if (product) {
        await updateProduct(product.id, form);
        showToast("Product updated successfully");
      } else {
        await createProduct(form);
        showToast("Product created successfully");
        resetForm();
      }

      onSave();
    } catch (error: any) {
      const status = error?.response?.status;

      if (status === 401) {
        showToast("Session expired. Please log in again.", "error");
      } else if (status === 403) {
        showToast("You are not allowed to perform this action.", "error");
      } else {
        showToast("Error saving product", "error");
      }

      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border p-4 mb-4 bg-white">
      <h2>{product ? "Edit product" : "New product"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <div style={{ marginTop: 10 }}>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : product ? "Update" : "Create"}
          </button>

          <button
            type="button"
            onClick={() => {
              resetForm();
              onCancel();
            }}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={hideToast}
            />
          )}
        </div>
      </form>
    </div>
  );
}
