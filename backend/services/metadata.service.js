// services/metadata.service.js

const generateMetadata = (product = {}) => {
  const rating = typeof product.rating === "number" ? product.rating : null;
  const category = product.category ?? "general";
  const name = product.name ?? "This product";

  let summary = "";

  if (rating !== null && rating > 3) {
    summary = `${name} is a highly rated ${category} product with a rating of ${rating.toFixed(
      1
    )}.`;
  } else {
    summary = `${name} is a ${category} product with mixed customer feedback. It has a return rate of ${
      product.returnRate.toFixed(0) ?? "N/A"
    }% and ${
      product.complaints ?? 0
    } reported complaints.`;
  }

  const searchText = `
    ${name}
    ${category}
    ${rating ?? ""}
  `.toLowerCase();

  const tags = [name, category].filter(Boolean);

  return {
    summary,
    searchText,
    tags
  };
};

export default generateMetadata;
