const API_URL = import.meta.env.VITE_API_URL;

/**
 * Fetch products from backend
 * @param {string} searchQuery
 * @returns {Promise<Array>}
 */
export const fetchProducts = async (searchQuery = "") => {
  // Fail-safe: never crash the app
  if (!API_URL) {
    console.error("VITE_API_URL is not defined");
    return [];
  }

  const url = searchQuery
    ? `${API_URL}?search=${encodeURIComponent(searchQuery)}`
    : API_URL;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error("Fetch failed:", response.status);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
