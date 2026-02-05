import { useState, useEffect, useRef, useCallback } from "react";
import { HiSearch } from "react-icons/hi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Searchbar({ items = [], onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const inputRef = useRef(null);
  const debounceTimer = useRef(null);
  const suppressSuggestionsRef = useRef(false);

  /* ---------- Suggestions (typing only) ---------- */
  useEffect(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    if (suppressSuggestionsRef.current) {
      suppressSuggestionsRef.current = false;
      setSuggestions([]);
      setOpen(false);
      return;
    }

    const next = items
      .map(p => p.title ?? p.name)
      .filter(Boolean)
      .filter(v => v.toLowerCase().includes(q))
      .slice(0, 8);

    setSuggestions(next);
    setOpen(next.length >= 0);
  }, [query, items]);

  /* ---------- Debounced search (typing only) ---------- */
  useEffect(() => {
    const q = query.trim();
    if (!q) return;

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      onSearch?.(q);
      navigate(`/search?q=${encodeURIComponent(q)}`, { replace: true });
    }, 700);

    return () => clearTimeout(debounceTimer.current);
  }, [query, onSearch, navigate]);

  /* ---------- Immediate search (click / submit) ---------- */
  const runSearchNow = useCallback(
    (value) => {
      clearTimeout(debounceTimer.current);
      setOpen(false);
      onSearch?.(value);
      navigate(`/search?q=${encodeURIComponent(value)}`);
    },
    [onSearch, navigate]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    suppressSuggestionsRef.current = true;
    runSearchNow(q);
  };

  const handleSelect = (value) => {
    suppressSuggestionsRef.current = true;
    setQuery(value);
    runSearchNow(value);
  };

  const handleClear = () => {
    clearTimeout(debounceTimer.current);
    setQuery("");
    setSuggestions([]);
    setOpen(false);
    onSearch?.("");
    navigate("/search", { replace: true });
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
          onFocus={() => suggestions.length && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          placeholder="Search products, brands or categories..."
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

        {open && (
          <ul className="absolute left-2 right-2 top-full mt-2 bg-white rounded-xl shadow-xl z-50 overflow-hidden">
            {suggestions.map((item, i) => (
              <li
                key={item + i}
                onMouseDown={() => {
                  suppressSuggestionsRef.current = true;
                }}
                onClick={() => handleSelect(item)}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}
