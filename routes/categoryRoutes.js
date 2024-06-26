import express from "express";
import { isAdmin, requireSignIn } from "../middleware/auth.middleware.js";
import {
  allCategory,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();
//route
//create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get all the categories
router.get("/all-categories", allCategory);

//get a single category
router.get("/single-category/:slug", singleCategoryController);

//delete category route
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
