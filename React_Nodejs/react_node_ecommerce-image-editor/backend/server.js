const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Upload the product image (transparent PNG)
app.post("/upload/product", upload.single("productImage"), (req, res) => {
  res.json({ filename: req.file.filename });
});

// Upload background images
app.post("/upload/background", upload.single("backgroundImage"), (req, res) => {
  res.json({ filename: req.file.filename });
});

// API endpoint to get product and background images
app.get("/images", (req, res) => {
  // Return list of uploaded product images and background images
  // Adjust this to provide the appropriate image URLs
  res.json({
    productImage: "product-image.png",
    backgroundImages: ["background1.png", "background2.png"],
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
