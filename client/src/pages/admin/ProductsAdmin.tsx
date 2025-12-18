import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../services/productService";
import type { Product } from "../../types/product";
import ProductForm from "../../components/ProductForm";

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Cargar productos
  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error("Error cargando productos:", error);
      alert("No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar producto?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("No se pudo eliminar el producto");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Productos (Admin)</h1>

      <button
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => {
          setEditingProduct(null);
          setShowForm(true);
        }}
      >
        + Nuevo producto
      </button>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onCancel={() => setShowForm(false)}
          onSave={async () => {
            await loadProducts();
            setShowForm(false);
          }}
        />
      )}

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Categoría</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">${p.price}</td>
              <td className="border p-2">{p.stock}</td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2 flex gap-2">
                <button
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  onClick={() => {
                    setEditingProduct(p);
                    setShowForm(true);
                  }}
                >
                  Editar
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDelete(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
