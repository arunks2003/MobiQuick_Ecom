import User from "../models/userModels.js";
import orderModel from "../models/orderModel.js";
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });

    res.status(200).send({ success: true, message: "Order fetched", orders });
  } catch (error) {
    console.error("Error while fetching orders:", error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Orders",
      error: error.message || error,
    });
  }
};

export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error while updating order:", error);
    res.status(500).send({
      success: false,
      message: "Error while updating order",
      error: error.message || error,
    });
  }
};
