import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import generateMetadata from "../services/metadata.service.js";

const router = express.Router();

/* ---------- Path helpers ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------- Health check ---------- */
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* ---------- Load products safely ---------- */
let products = [];

try {
  const filePath = path.join(__dirname, "../products.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(fileData);

  if (Array.isArray(parsed)) {
    products = parsed;
  }
} catch {
  products = [];
}

/* ---------- Attach metadata safely ---------- */
products = products.map((product) => {
  let metadata = {
    summary: "",
    searchText: "",
    tags: []
  };

  try {
    metadata = generateMetadata(product);
  } catch {
    // silently fallback to empty metadata
  }

  return {
    ...product,
    metadata
  };
});

/* ---------- GET /api/v1/products ---------- */
router.get("/products", (req, res) => {
  const search = req.query.search?.toLowerCase();
  let result = products;

  if (search) {
    result = result.filter(
      (product) =>
        product.metadata?.searchText &&
        product.metadata.searchText.includes(search)
    );

    /* ---------- Sorting logic ---------- */
    const num = (v) => Number(v ?? 0);

    result = result.sort((a, b) => {
      const aRating = num(a.rating),
        bRating = num(b.rating);
      if (bRating !== aRating) return bRating - aRating;

      const aPrice = num(a.price),
        bPrice = num(b.price);
      if (aPrice !== bPrice) return aPrice - bPrice;

      const aSales = num(a.sales),
        bSales = num(b.sales);
      if (bSales !== aSales) return bSales - aSales;

      const aReturn = num(a.returnRate),
        bReturn = num(b.returnRate);
      if (aReturn !== bReturn) return aReturn - bReturn;

      const aComplaints = num(a.complaints),
        bComplaints = num(b.complaints);
      if (aComplaints !== bComplaints) return aComplaints - bComplaints;

      const aReviews = num(a.reviews ?? a.review),
        bReviews = num(b.reviews ?? b.review);
      return bReviews - aReviews;
    });
  }

  res.status(200).json(result);
});

export default router;
