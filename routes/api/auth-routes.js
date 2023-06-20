const express = require("express");

const authController = require("../../controllers/auth-controllers")
const schemas = require("../../schemas/users");
const { validateBody } = require("../../decorators");

const router = express.Router();



router.post("/register", validateBody(schemas.userRegisterSchema), authController.signup);
router.post("/login", validateBody(schemas.userRegisterSchema), authController.signin);


module.exports = router;