// Modules Import
const { Category } = require("../models/modelSchema"),
  slugify = require("slugify"),
  asyncHandler = require("express-async-handler"),
  apiErrors = require("../utils/apiErrors");

// POST
/*
 * @desc    Create Category
 * @route   POST   /api/v1/category
 * @access  Private
 * */
const createCategory = asyncHandler(async (req, res,next) => {
  const { name } = req.body;
  const category = await Category.create({ name, slug: slugify(name) });
  return res.status(201).json({ data: category });

});

// GET
/*
 * @desc   List of Categories
 * @route  GET /api/v1/categories
 * @access Public
 * */
const getCategories = asyncHandler(async (req, res) => {
  // Loading The Categories
  const page = Number(req.query.page) || 1; // Page Number
  const limit = Number(req.query.limit) || 5; // Limit Categories
  const skip = (page - 1) * limit; // Page Next
  // Find for Categories
  const categories = await Category.find({}).skip(skip).limit(limit);
  return res.status(200).json({ result: categories.length, page, data: categories });
});

/*
 *  @desc    Get Specific Category By Id
 *  @route   GET /api/v1/categories/:id
 *  @access  Public
 * */
const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let category = await Category.findById(id.match(/^[0-9a-fA-F]{24}$/));
  if (!category) {
    return next(new apiErrors(`No Category for this id ${id}`, 404));
  } else {
    return res.status(200).json({ data: category });
  }
});

// UPDATE
/*
 *  @desc   Update Specific Category
 *  @route  PUT /api/v1/categories/:id
 *  @access Private
 * */
const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id.match(/^[0-9a-fA-F]{24}$/) },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new apiErrors(`No Category for this id ${id}`, 404));
  } else {
    return res.status(200).json({ data: category });
  }
});

// DELETE
/*
 *  @desc   Delete Specific Category
 *  @route  DELETE /api/v1/categories/:id
 *  @access Private
 * */
const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(
    id.match(/^[0-9a-fA-F]{24}$/)
  );
  if (!category) {
    return next(new apiErrors(`No Category for this id ${id}`, 404));
  } else {
    return res.status(204).send(`Success Delete Category By ${id}`);
  }
});

// Modules Export
module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
