const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProductsFromStorage();
    product.id = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    products.push(product);
    this.saveProductsToStorage(products);
  }

  getProducts() {
    return this.getProductsFromStorage();
  }

  getProductById(id) {
    const products = this.getProductsFromStorage();
    const product = products.find((p) => p.id === id);
    return product || null;
  }

  updateProduct(id, updatedFields) {
    const products = this.getProductsFromStorage();
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updatedFields };
      this.saveProductsToStorage(products);
      return true;
    }
    return false;
  }

  deleteProduct(id) {
    const products = this.getProductsFromStorage();
    const updatedProducts = products.filter((p) => p.id !== id);
    this.saveProductsToStorage(updatedProducts);
  }

  getProductsFromStorage() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  saveProductsToStorage(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), "utf8");
  }
}

// Ejemplo de uso
const productManager = new ProductManager("./products.json");

productManager.addProduct({
  title: "Smartphone",
  description: "Un smartphone de última generación",
  price: 699.99,
  thumbnail: "smartphone.jpg",
  code: "PHN01",
  stock: 50,
});

productManager.addProduct({
  title: "Laptop",
  description: "Una laptop potente para trabajo y entretenimiento",
  price: 1299.99,
  thumbnail: "laptop.jpg",
  code: "LTP02",
  stock: 25,
});

productManager.addProduct({
  title: "Headphones",
  description: "Audífonos inalámbricos con gran calidad de sonido",
  price: 99.99,
  thumbnail: "headphones.jpg",
  code: "HDN03",
  stock: 100,
});

console.log("All products:", productManager.getProducts());

const productById = productManager.getProductById(2);
if (productById) {
  console.log("Product found by ID:", productById);
} else {
  console.log("Product not found by ID.");
}

const updateResult = productManager.updateProduct(1, {
  title: "Updated Smartphone",
  price: 799.99,
});
if (updateResult) {
  console.log("Product updated successfully.");
} else {
  console.log("Product not found to update.");
}

productManager.deleteProduct(3);
console.log("All products after deletion:", productManager.getProducts());

module.exports = ProductManager;
