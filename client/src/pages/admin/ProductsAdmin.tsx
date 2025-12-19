import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  getAllCategories,
} from "../../services/productService";
import type { Product } from "../../types/product";
import ProductForm from "../../components/ProductForm";
import CircularProgress from "@mui/material/CircularProgress";

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [allCategories, setAllCategories] = useState<string[]>([]);

  // Cargar productos de backend por página y filtros
  const loadProducts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await getProducts(page, ITEMS_PER_PAGE, search, category);
      await new Promise((resolve) => setTimeout(resolve, 150));
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.page);

      // Actualizar categorías dinámicamente desde los productos traídos
    } catch (error) {
      console.error("Error cargando productos:", error);
      alert("No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al iniciar y cuando cambie la página o filtros
  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage, search, category]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getAllCategories();
        setAllCategories(res.data);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };

    loadCategories();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar producto?")) return;
    try {
      await deleteProduct(id);
      // Volver a cargar la página actual
      loadProducts(currentPage);
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("No se pudo eliminar el producto");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Administración de Productos
      </h1>

      <button
        className="mb-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
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
            await loadProducts(currentPage);
            setShowForm(false);
          }}
        />
      )}

      <div className="relative overflow-x-auto bg-white shadow-lg rounded-lg">
        {/* Filtros */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12, padding: 12 }}>
          <input
            placeholder="Buscar por nombre..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearch(searchInput); // dispara la búsqueda
                setCurrentPage(1); // opcional: volver a la página 1
              }
            }}
            className="border p-2 rounded"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Todas las categorías</option>
            {allCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <table className="w-full table-auto">
          <thead className="bg-gray-100 text-left text-gray-600">
            <tr>
              <th className="p-3 font-medium">Nombre</th>
              <th className="p-3 font-medium">Precio</th>
              <th className="p-3 font-medium">Stock</th>
              <th className="p-3 font-medium">Categoría</th>
              <th className="p-3 font-medium">Imagen</th>
              <th className="p-3 font-medium">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.stock}</td>
                <td>{p.category}</td>
                <td>
                  {p.imageUrl && (
                    <img
                      src={`http://localhost:3001${p.imageUrl}`}
                      width={50}
                      alt={p.name}
                    />
                  )}
                </td>
                <td>
                  <button
                    onClick={() => {
                      setEditingProduct(p);
                      setShowForm(true);
                    }}
                    className="mr-2 text-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
      {/* Paginación */}
      <div style={{ marginTop: 12, display: "flex", gap: 8, padding: 12 }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          ⬅ Anterior
        </button>

        <span className="px-3 py-1">
          Página {currentPage} de {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
}
