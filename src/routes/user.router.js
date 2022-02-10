const express= require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const Role = require("../utils/userRoles.utils");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

const { createUserSchema, updateUserSchema, validateLogin} = require("../middleware/validators/userValidator.middleware");
const { User } = require("../utils/userRoles.utils");

router.get("/id/:id", awaitHandlerFactory(UserController.getUserById));
router.get("/username/:username", awaitHandlerFactory(UserController.getUserByUsername));
// router.get("/", awaitHandlerFactory(UserController.getAllusers));

router.get("/", auth(), awaitHandlerFactory(UserController.getAllusers));
// router.get("/id/:id", auth(), awaitHandlerFactory(UserController.getUserById));
// router.get("/username/:username", auth(), awaitHandlerFactory(UserController.getUserByUsername));
router.get("/whoami", auth(), awaitHandlerFactory(UserController.get));
router.post("/", createUserSchema, awaitHandlerFactory(UserController.createUser));
router.patch("/id/:id", auth(Role.Admin), updateUserSchema, awaitHandlerFactory(UserController.updateUser));
router.delete("/id/:id", auth(Role.Admin), awaitHandlerFactory(UserController.deleteUser));

router.post("/login", validateLogin, awaitHandlerFactory(UserController.userLogin));

module.exports = router