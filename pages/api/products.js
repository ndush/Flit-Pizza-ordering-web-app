import connectDB from "../../utils/dbConnect";
import Product from "../../models/Product";

connectDB();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      if (req.query.id || req.query._id) {
        const productId = req.query.id || req.query._id;
        const product = await Product.findById(productId);

        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
      } else {
        const products = await Product.find({});
        return res.status(200).json(products);
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, desc, img, prices, extraOptions } = req.body;
      const newProduct = await Product.create({
        title,
        desc,
        img,
        prices,
        extraOptions,
      });

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        return res
          .status(400)
          .json({ message: "Product ID is required for deletion" });
      }

      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
