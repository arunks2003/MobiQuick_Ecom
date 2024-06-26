import express from "express";
import register, {
  updateProfileController,
} from "../controllers/registerController.js";
import { loginController } from "../controllers/loginController.js";
import { testController } from "../controllers/testController.js";
import { isAdmin, requireSignIn } from "../middleware/auth.middleware.js";
import { forgotPasswordController } from "../controllers/forgotPasswordController.js";
import {
  getAllOrdersController,
  getOrdersController,
  orderStatusController,
} from "../controllers/orderController.js";

//router object
const router = express.Router();

//Register route
router.post("/register", register);

//router // POST
router.post("/login", loginController);

//forgot password
router.post("/forgot-password", forgotPasswordController);

//test route
//{token check, admin check, controller}
router.get("/test", requireSignIn, isAdmin, testController);

//protected user Route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected admin Route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all -orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//order-status
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
