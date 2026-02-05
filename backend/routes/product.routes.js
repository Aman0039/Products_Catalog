import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import  generateMetadata from "../services/metadata.service.js";


const router = express.Router();

/* ---------- Path helpers ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------- Read products from JSON ---------- */
let products = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../database/products.json"),
    "utf-8"
  )
);

/* ---------- Attach metadata to each product ---------- */
products = products.map(product => ({
  ...product,
  metadata: generateMetadata(product)
}));

/* ---------- GET /api/v1/products ---------- */
router.get("/products", (req, res) => {
  const search = req.query.search?.toLowerCase();

  let result = products;

  /* ---------- Metadata-based search ---------- */
  if (search) {
    result = products.filter(product =>
      product.metadata.searchText.includes(search)
    );

    /* ---------- Sorting logic ---------- */
    const num = v => Number(v ?? 0);

    result.sort((a, b) => {
      const aRating = num(a.rating), bRating = num(b.rating);
      if (bRating !== aRating) return bRating - aRating; // rating high → low

      const aPrice = num(a.price), bPrice = num(b.price);
      if (aPrice !== bPrice) return aPrice - bPrice; // price low → high

      const aSales = num(a.sales), bSales = num(b.sales);
      if (bSales !== aSales) return bSales - aSales; // sales high → low

      const aReturn = num(a.returnRate), bReturn = num(b.returnRate);
      if (aReturn !== bReturn) return aReturn - bReturn; // return low → high

      const aComplaints = num(a.complaints), bComplaints = num(b.complaints);
      if (aComplaints !== bComplaints) return aComplaints - bComplaints; // complaints low → high

      const aReviews = num(a.reviews ?? a.review), bReviews = num(b.reviews ?? b.review);
      return bReviews - aReviews; // reviews high → low
    });
  }

  res.json(result);
});

export default router;
