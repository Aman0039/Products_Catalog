// src/components/ProductCard.jsx
import { useState, memo } from "react";
import { FiShoppingCart, FiBookmark, FiStar } from "react-icons/fi";

const ProductCard = ({ product = {} }) => {
  const [wish, setWish] = useState(!!product.isWish);

  /* ---------- Normalize data ---------- */
  const title = product.title ?? product.name ?? "Product";
  const metadata = product.metadata ?? {};
  const rating = typeof product.rating === "number" ? product.rating : null;
  const stock = typeof product.stock === "number" ? product.stock : null;

  const rawPrice = product.Sellingprice ?? product.price ?? 0;
  const mrp = product.mrp;

  const formatter = (val) =>
    typeof val === "number" ? val.toLocaleString() : val ?? "—";

  /* ---------- Description logic ---------- */
  const description =
    metadata.summary ??
    product.description ??
    "No description available.";

  return (
    <article
      tabIndex={0}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transform-gpu hover:scale-[1.02] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 overflow-hidden"
    >
      <div className="p-4 flex flex-col gap-3">
        {/* ---------- Header ---------- */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold leading-snug text-gray-900 truncate">
              {title}
            </h3>
          </div>

          <div className="text-right">
            <div className="text-indigo-600 font-bold text-lg">
              ₹{formatter(rawPrice)}
            </div>

            {mrp != null && (
              <div className="text-xs text-gray-400 line-through">
                MRP: ₹{formatter(mrp)}
              </div>
            )}

            {product.currency && (
              <div className="text-xs text-gray-400">{product.currency}</div>
            )}
          </div>
        </div>

        {/* ---------- Description / Metadata summary ---------- */}
        <p className="text-sm text-gray-500 line-clamp-3">
          {description}
        </p>

        {/* ---------- Rating & Stock ---------- */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex flex-col">
            {rating != null ? (
              <div className="text-sm font-medium text-gray-700 flex items-center">
                <FiStar className="w-4 h-4 text-yellow-500 mr-1" />
                <span>{rating.toFixed(1)}</span>
              </div>
            ) : (
              <div className="text-sm text-gray-400">No rating</div>
            )}

            <div className="text-xs text-gray-400">
              ({product.reviewsCount ?? 0} reviews)
            </div>

            {stock != null && stock <= 10 && (
              <div
                className={`mt-1 text-xs font-semibold ${
                  stock === 0 ? "text-red-500" : "text-yellow-600"
                }`}
              >
                {stock === 0 ? "Out of stock" : `${stock} left`}
              </div>
            )}
          </div>

          {/* ---------- Actions ---------- */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                alert(`Added "${title}" to cart!`);
              }}
              className="inline-flex items-center justify-center p-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 active:scale-95 transition"
              aria-label="Add to cart"
            >
              <FiShoppingCart className="w-4 h-4" />
            </button>

            <button
              onClick={() => setWish(!wish)}
              className="inline-flex items-center justify-center p-2 bg-white/90 backdrop-blur rounded-md border border-gray-200 text-sm hover:scale-105 transition"
              aria-label="Add to wishlist"
            >
              <FiBookmark
                className={
                  wish
                    ? "w-4 h-4 text-indigo-600"
                    : "w-4 h-4 text-gray-600"
                }
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default memo(ProductCard);