const express = require("express");

const authController = require("../../controllers/auth-controllers")
const schemas = require("../../schemas/users");
const { validateBody } = require("../../decorators");
const {authenticate} = require('../../middlewares')

const router = express.Router();



router.post("/register", validateBody(schemas.userRegisterSchema), authController.signup);
router.post("/login", validateBody(schemas.userRegisterSchema), authController.signin);
router.get("/current", authenticate, authController.getCurrent)


module.exports = router;