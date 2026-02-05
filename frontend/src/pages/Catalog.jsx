import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import Searchbar from "../components/Searchbar";
import { fetchProducts } from "../data";

const ProductCard = lazy(() => import("../components/ProductCard"));

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // true for initial load only

  // ✅ Stable function (VERY IMPORTANT)
  const loadProducts = useCallback(async (query = "") => {
    // only show loading for initial load or reset
    if (!query) setLoading(true);

    const data = await fetchProducts(query);
    setProducts(data);

    setLoading(false);
  }, []);

  // 🔹 Initial load (runs ONCE)
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* SEARCH */}
      <Searchbar
        items={products}
        onSearch={loadProducts}
      />

      {/* STATUS */}
      {loading && <p className="font-semibold text-gray-600 flex justify-center mt-8">Loading products...</p>}

      {!loading && products.length === 0 && (
        <p className="mt-6 text-rose-500">No products found</p>
      )}

      {/* PRODUCTS */}
      {!loading && (
        <Suspense fallback={<p className="font-semibold text-gray-600 flex justify-center mt-8">Loading products…</p>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {products.map(product => (
              <ProductCard
                key={product.productId ?? product.id}
                product={product}
              />
            ))}
          </div>
        </Suspense>
      )}
    </div>
  );
}
