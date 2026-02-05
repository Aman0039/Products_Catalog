# Products_Catalog

A full-stack **Product Catalog** application built with **Node.js, Express.js, and React**.  
The project demonstrates a clean backend–frontend separation with **server-side search using metadata**, debounced queries, URL-based filtering, and a performance-optimized React UI.

---

## 🚀 Features

### Backend (Node.js + Express)
- Product data served from a JSON datastore
- **Metadata generation service** for each product
- Server-side search using generated metadata (`searchText`)
- Multi-criteria sorting:
  - Rating (high → low)
  - Price (low → high)
  - Sales (high → low)
  - Return rate (low → high)
  - Complaints (low → high)
- RESTful API design
- ES Modules (`import / export`) structure

### Frontend (React)
- Debounced search input to reduce API calls
- URL-based search (`?search=`) for shareable links
- Clean and reusable `Searchbar` component
- Optimized `ProductCard` with:
  - Metadata-based summary rendering
  - Rating & stock indicators
  - Memoization to prevent unnecessary re-renders
- Clear separation of UI and data logic

---

## 🧱 Project Structure

```txt
Products_Catalog/
│
├── backend/
│   ├── index.js
│   ├── routes/
│   │   └── product.route.js
│   ├── services/
│   │   └── metadata.service.js
│   ├── database/
│   │   └── products.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Searchbar.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── pages/
│   │   └── App.jsx
│
└── README.md


```txt

GET /api/v1/products
GET /api/v1/products?search=${query}

```

## Run Backend Server

```txt

cd backend
npm install
npm run start

```

## Run Frontend Server

```txt

cd frontend
npm install
npm run dev
