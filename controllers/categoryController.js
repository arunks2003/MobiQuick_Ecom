import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).send({ message: "Name is required" });

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exists",
        category: existingCategory,
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name, { lower: true }),
    }).save();

    res.status(201).send({
      success: true,
      message: "Category Created Successfully!!!",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in categoryController",
      error: err.message,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params; //from url
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully!!!",
      category,
    });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Error in updatecategory" });
  }
};

//all category controller
export const allCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res
      .status(200)
      .send({ success: true, message: "All category list", category });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Error in allCat controller" });
  }
};

//single category controller
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Got single category successfully!!!",
      category,
    });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Error in single category controller" });
  }
};

//delete a category controller
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);

    res
      .status(200)
      .send({ success: true, message: "Category deleted Successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, message: "Error in deletecategory controller" });
  }
};
