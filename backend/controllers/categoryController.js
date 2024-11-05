import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js"; // Ensure this model exists

// @DESC Fetch all categories
// @ROUTE /api/categories
// @METHOD GET
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json({ success: true, categories });
});

// @DESC Create a new category
// @ROUTE /api/categories
// @METHOD POST
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = new Category({ name });
  const createdCategory = await category.save();
  res.status(201).json({ success: true, category: createdCategory });
});

// @DESC Delete a category
// @ROUTE /api/categories/:id
// @METHOD DELETE
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Category deleted" });
});
