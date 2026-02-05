import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const products = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../data/products.json"),
    "utf-8"
  )
);

router.get("/products", (req, res) => {
  const search = req.query.search?.toLowerCase();

  let result = products;

  if (search) {
    result = products.filter(product =>
      product.name.toLowerCase().includes(search)
    );
  }

  res.json(result);
});

export default router;
