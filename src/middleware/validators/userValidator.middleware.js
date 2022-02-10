const { body } = require("express-validator");
const Role = require("../../utils/userRoles.utils");

exports.createUserSchema = [
    body("username")
        .exists()
        .withMessage("Username is required")
        .isLength({ min: 6})
        .withMessage("Username must be at least 6 chars long"),
    body("email")
        .exists()
        .withMessage("email is required")
        .isEmail()
        .withMessage("Must be a valid email")
        .normalizeEmail(),
    body("role")
        .exists()
        .isIn([Role.Admin, Role.Staff, Role.User])
        .withMessage("Invalid Role type"),
    body("password")
        .exists()
        .withMessage("Please fill the password field")
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters"),        
    body("confirm_password")
        .exists()
        .withMessage("Please confirm password")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("confirm_password field must have the same value as the password field."),
    body("status")
        .exists()
        .withMessage("fill the status")
        .isBoolean()
        .withMessage("must be a boolean.")        
];

exports.updateUserSchema = [
    body("username")
        .optional()
        .isLength({ min: 6})
        .withMessage("Username must be at least 6 chars long"),
    body("email")
        .optional()
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body("role")
        .optional()
        .isIn([Role.Admin, Role.Staff, Role.User])
        .withMessage("Invalid Role type"),
    body("password")
        .optional()
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .custom((value, { req }) => !!req.body.confirm_password)
        .withMessage('Please confirm your password'),
    body("confirm_password")
        .optional()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('confirm_password field must have the same value as the password field'),
    body("status")
        .optional()
        .isBoolean()
        .withMessage("must be a boolean.")  
];

exports.validateLogin = [
    body("username")
        .exists()
        .withMessage("Username is required"),
    body("password")
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .withMessage("Password must be filled")
];