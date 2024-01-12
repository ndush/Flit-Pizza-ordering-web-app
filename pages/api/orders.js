import connectDB from "../../utils/dbConnect.js";
import Order from "../../models/Order";

connectDB();

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        if (id) {
          const foundOrder = await Order.findById(id);
          if (!foundOrder) {
            return res.status(404).json({ message: "Order not found" });
          }

          return res.status(200).json(foundOrder);
        } else {
          const orders = await Order.find();
          if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "Orders not found" });
          }

          return res.status(200).json(orders);
        }
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
      }

    case "PUT":
      try {
        const updatedOrder = await Order.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });

        if (!updatedOrder) {
          return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json(updatedOrder);
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
      }

    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
