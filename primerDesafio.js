class Product {
  static nextId = 1;

  constructor(title, description, price, thumbnail, code, stock) {
    this.id = Product.nextId++;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // Validar que todos los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    // Validar que no se repita el campo "code"
    const existingProduct = this.products.find((product) => product.code === code);
    if (existingProduct) {
      console.error("El código del producto ya existe.");
      return;
    }

    const newProduct = new Product(title, description, price, thumbnail, code, stock);
    this.products.push(newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.error("Producto no encontrado.");
      return;
    }
    return product;
  }
}

// Ejemplo de uso
const productManager = new ProductManager();

productManager.addProduct("Smartphone", "Un smartphone de última generación", 699.99, "smartphone.jpg", "PHN01", 50);
productManager.addProduct("Laptop", "Una laptop potente para trabajo y entretenimiento", 1299.99, "laptop.jpg", "LTP02", 25);
productManager.addProduct("Headphones", "Audífonos inalámbricos con gran calidad de sonido", 99.99, "headphones.jpg", "HDN03", 100);

console.log(productManager.getProducts());

const productById = productManager.getProductById(2);
if (productById) {
  console.log("Producto encontrado:", productById);
}

const nonExistentProduct = productManager.getProductById(10); // Producto no existe, mostrará el error "Producto no encontrado".
