const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Fetch products from backend
 * @param searchQuery string
 * @returns Promise<Array>
 */
export const fetchProducts = async (searchQuery = "") => {
  // Guard against missing env variable
  if (!BASE_URL) {
    throw new Error("VITE_API_URL is not defined");
  }

  const url = searchQuery
    ? `${BASE_URL}api/v1/products?search=${encodeURIComponent(searchQuery)}`
    : `${BASE_URL}api/v1/products`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch products (${response.status})`);
    }

    const data = await response.json();

    // Always return array
    return Array.isArray(data) ? data : [];
  } catch {
    // Silent fail-safe for production UI
    return [];
  }
};
