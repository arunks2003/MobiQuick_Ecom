import express from "express";
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middleware/auth.middleware.js";
import {
  createProductController,
  deleteProductController,
  gerProductController,
  getSingleProduct,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  proudctPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import {
  braintreePaymentController,
  braintreeTokenController,
} from "../controllers/payment_gatewayController.js";

const router = express.Router();

// Route to create a product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get products Route
router.get("/get-product", gerProductController);

//get single product
router.get("/get-product/:slug", getSingleProduct);

//get the photo of product
router.get("/product-photo/:pid", proudctPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//update product route
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//filter product
router.post("/product-filters", productFilterController);

//product count router.get
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar products
router.get("/related-product/:pid/:cid", realtedProductController);

//category-wise
router.get("/product-category/:slug", productCategoryController);

//payment route
//token
router.get("/braintree/token", braintreeTokenController);
//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
