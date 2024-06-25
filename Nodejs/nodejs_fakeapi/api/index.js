const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const products = Array.from({ length: 30 }, (v, k) => ({
  id: k + 1,
  title: `Product ${k + 1}`,
  subtitle: `Subtitle for product ${k + 1}`,
  price: (Math.random() * 100).toFixed(2),
  category: `${(k % 5) + 1}`,
  imageURL: `https://picsum.photos/1080/1080?random=${k + 1}`,
}));

// 1. Get list of products
app.get("/products", (req, res) => {
  res.json(products);
});

// 2. Get specific product based on ID
app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// 3. Get all products from a specific category
app.get("/products/category/:category", (req, res) => {
  const categoryProducts = products.filter(
    (p) => p.category === req.params.category
  );
  if (categoryProducts.length > 0) {
    res.json(categoryProducts);
  } else {
    res.status(404).json({ error: "No products found in this category" });
  }
});

// 4. Post request to get product based on product id and key
app.post("/products", (req, res) => {
  const { id, key } = req.body;
  if (key !== "abc1245363") {
    return res.status(403).json({ error: "Invalid key" });
  }
  const product = products.find((p) => p.id === parseInt(id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
