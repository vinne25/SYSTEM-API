const Product = require("../models/products");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ["name", "price", "description"],
    });
    if (products.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const existingProduct = await Product.findOne({ where: { name } });
    if (existingProduct) {
      return res.status(409).json({ message: "Product already exists" });
    }
    const product = await Product.create({ name, price, description });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, description } = req.body;
    const product = await Product.findOne({ where: { id: id } });
    if (product) {
      product.description = description;
      product.price = price;
      await product.save();
      res.status(200).json({ message: "Product updated successfully!" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id: id } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
