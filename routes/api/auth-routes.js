const express = require("express");

const authController = require("../../controllers/auth-controllers")
const schemas = require("../../schemas/users");
const { validateBody } = require("../../decorators");
const {authenticate} = require('../../middlewares')

const router = express.Router();



router.post("/register", validateBody(schemas.userAuthSchema), authController.signup);
router.post("/login", validateBody(schemas.userAuthSchema), authController.signin);
router.get("/current", authenticate, authController.getCurrent);
router.post("/logout", authenticate, authController.logout);
router.patch("/", authenticate, validateBody(schemas.userSubscriptionSchema), authController.updateSubscriptionStatus);


module.exports = router;