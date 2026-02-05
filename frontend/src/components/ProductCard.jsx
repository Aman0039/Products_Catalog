// src/components/ProductCard.jsx
import { useState, memo } from 'react'
import { FiShoppingCart, FiBookmark, FiStar } from 'react-icons/fi'

function ProductCard({ product = {}, onAddToCart, onAddToWishlist }) {
  const [wish, setWish] = useState(!!product.isWish)

  // ✅ Normalize data (IMPORTANT)
  const title = product.title ?? product.name ?? 'Product'
  const metadata = product.Metadata ?? product.metadata ?? {}
  const rating = typeof product.rating === 'number' ? product.rating : null
  const stock = typeof product.stock === 'number' ? product.stock : null

  function handleWishlist(e) {
    e.stopPropagation()
    const next = !wish
    setWish(next)
    onAddToWishlist?.(product, next)
  }

  // Price selection: prefer Sellingprice, then price, then 0
  const rawPrice = product.Sellingprice ?? product.price ?? 0
  const mrp = product.mrp

  const formatter = (val) => {
    if (typeof val !== 'number') return val ?? '—'
    return val.toLocaleString()
  }

  return (
    <article
      tabIndex={0}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transform-gpu hover:scale-[1.02] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 overflow-hidden"
    >
      {product.image && (
        <div className="overflow-hidden rounded-t-xl h-48 bg-gray-100">
          <img
            src={product.image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold leading-snug text-gray-900 truncate">
              {title}
            </h3>

            {product.productId != null && (
              <div className="text-xs text-gray-400">ID: {product.productId}</div>
            )}
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

        {product.badge && (
          <div className="inline-block bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {product.badge}
          </div>
        )}

        <p className="text-sm text-gray-500 max-h-20 overflow-hidden">
          {product.description ?? 'No description available.'}
        </p>

        {/* ✅ Metadata fallback */}
        {Object.keys(metadata).length > 0 && (
          <div className="text-xs text-gray-600 flex flex-wrap gap-2">
            {metadata.model && <span className="px-2 py-1 bg-gray-100 rounded">{metadata.model}</span>}
            {metadata.ram && <span className="px-2 py-1 bg-gray-100 rounded">{metadata.ram}</span>}
            {metadata.storage && <span className="px-2 py-1 bg-gray-100 rounded">{metadata.storage}</span>}
            {metadata.screensize && <span className="px-2 py-1 bg-gray-100 rounded">{metadata.screensize}</span>}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex flex-col">
            {/* ✅ Rating fixed */}
            {rating != null ? (
              <div className="text-sm font-medium text-gray-700 flex items-center">
                <FiStar className="w-4 h-4 text-yellow-500 mr-1" />
                <span>{Math.floor(rating * 10) / 10}</span>
              </div>
            ) : (
              <div className="text-sm text-gray-400">No rating</div>
            )}

            <div className="text-xs text-gray-400">
              ({product.reviews ?? stock ?? 0})
            </div>

            {stock <= 10 && (
              <div
                className={`mt-1 text-xs font-semibold ${
                  (stock === 0 || stock < 5) ? 'text-red-500' : 'text-yellow-600'
                }`}
              >
                {stock === 0 ? 'Out of stock' : `${stock} in stock`}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart?.(product)
              }}
              className="inline-flex items-center justify-center p-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 active:scale-95 transition"
              aria-label="Add to cart"
            >
              <FiShoppingCart className="w-4 h-4" />
            </button>

            <button
              onClick={handleWishlist}
              aria-pressed={wish}
              className="inline-flex items-center justify-center p-2 bg-white/90 backdrop-blur rounded-md border border-gray-200 text-sm hover:scale-105 transition"
            >
              <FiBookmark
                className={wish ? "w-4 h-4 text-indigo-600" : "w-4 h-4 text-gray-600"}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

/* 🔥 Memoized to prevent unnecessary re-renders */
export default memo(ProductCard)
