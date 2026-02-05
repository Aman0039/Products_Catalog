const BASE_URL = "http://localhost:5000/api/v1";

/**
 * Fetch products from backend
 * @param {string} searchQuery
 * @returns {Promise<Array>} array of product objects
 */
export const fetchProducts = async (searchQuery = "") => {
  try {
    const url = searchQuery
      ? `${BASE_URL}/products?search=${encodeURIComponent(searchQuery)}`
      : `${BASE_URL}/products`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data; // ✅ array of objects only
  } catch (error) {
    console.error("API Error:", error);
    return []; // fail-safe
  }
};
