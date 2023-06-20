const express = require("express");

const authController = require("../../controllers/auth-controllers")
const schemas = require("../../schemas/users");
const { validateBody } = require("../../decorators");

const router = express.Router();



router.post("/signup", validateBody(schemas.userRegisterSchema), authController.signup)

module.exports = router;