const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
// const setupSwagger = require("./docs/swagger");
// setupSwagger(app);

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
  imageURL: `https://picsum.photos/200/300?random=${k + 1}`,
}));

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get the list of products
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   subtitle:
 *                     type: string
 *                   price:
 *                     type: string
 *                   category:
 *                     type: string
 *                   imageURL:
 *                     type: string
 */
app.get("/products", (req, res) => {
  res.json(products);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 subtitle:
 *                   type: string
 *                 price:
 *                   type: string
 *                 category:
 *                   type: string
 *                 imageURL:
 *                   type: string
 *       404:
 *         description: Product not found
 */
app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

/**
 * @swagger
 * /products/category/{category}:
 *   get:
 *     summary: Get all products from a specific category
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   subtitle:
 *                     type: string
 *                   price:
 *                     type: string
 *                   category:
 *                     type: string
 *                   imageURL:
 *                     type: string
 *       404:
 *         description: No products found in this category
 */
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

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Get a product by ID with a key
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               key:
 *                 type: string
 *     responses:
 *       200:
 *         description: A product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 subtitle:
 *                   type: string
 *                 price:
 *                   type: string
 *                 category:
 *                   type: string
 *                 imageURL:
 *                   type: string
 *       403:
 *         description: Invalid key
 *       404:
 *         description: Product not found
 */
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
