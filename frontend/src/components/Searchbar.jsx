import { useState, useEffect, useRef, useCallback } from "react";
import { HiSearch } from "react-icons/hi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  /* ---------- Debounced backend search ---------- */
  useEffect(() => {
    const q = query.trim();

    clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      // 🔥 CASE 1: empty input → fetch all products
      if (!q) {
        onSearch?.("");
        navigate("/api/v1/products", { replace: true });
        return;
      }

      // 🔥 CASE 2: search using backend metadata
      onSearch?.(q);
      navigate(`/api/v1/products?search=${q}`, { replace: true });
    }, 300);

    return () => clearTimeout(debounceTimer.current);
  }, [query, onSearch, navigate]);

  /* ---------- Immediate search (Enter / icon click) ---------- */
  const runSearchNow = useCallback(
    (value) => {
      clearTimeout(debounceTimer.current);

      const q = value.trim();

      if (!q) {
        onSearch?.("");
        navigate("/api/v1/products", { replace: true });
        return;
      }

      onSearch?.(q);
      navigate(`/api/v1/products?search=${q}`, { replace: true });
    },
    [onSearch, navigate]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearchNow(query);
  };

  const handleClear = () => {
    clearTimeout(debounceTimer.current);
    setQuery("");
    onSearch?.("");
    navigate("/api/v1/products", { replace: true });
    inputRef.current?.focus();
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4">
      <form
        onSubmit={handleSubmit}
        role="search"
        className="relative w-full flex items-center gap-2 bg-white rounded-2xl p-3 shadow-md"
      >
        <button
          type="submit"
          aria-label="Search"
          className="text-gray-600 p-2 hover:scale-105 transition"
        >
          <HiSearch className="w-5 h-5" />
        </button>

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products or categories..."
          className="flex-1 bg-transparent outline-none text-gray-800 px-2"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="text-gray-400 hover:text-gray-700 p-1"
          >
            <IoCloseCircleOutline className="w-5 h-5" />
          </button>
        )}
      </form>
    </div>
  );
};

export default Searchbar;
