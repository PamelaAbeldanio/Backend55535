const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const port = 3000;

const productManager = new ProductManager("./products.json"); 

app.get("/products", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

  try {
    const products = await productManager.getProducts();
    const limitedProducts = limit ? products.slice(0, limit) : products;
    res.json(limitedProducts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
