const express = require("express"),
  router = express.Router(),
  {
    getCategoryValidator,
    createCategeoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator
  } = require("../utils/validator/categoryValidator"),
  {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
  } = require("../services/categoryServices");
// Categories
router
  .route("/")
  .get(getCategories)
  .post(createCategeoryValidator, createCategory);
// Category
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);
module.exports = router;
