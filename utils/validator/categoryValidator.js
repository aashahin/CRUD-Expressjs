const { check } = require("express-validator"),
  { validatorError } = require("../../middlewares/validatorError");
exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id."),
  validatorError,
];
exports.createCategeoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Require Category Name")
    .isLength({ min: 3 })
    .withMessage("Words Minimum is 3")
    .isLength({ max: 32 })
    .withMessage("Words Maximum is 32"),
  validatorError,
];
exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id."),
  validatorError,
];
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id."),
  validatorError,
];