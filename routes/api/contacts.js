const express = require('express')

const router = express.Router()

const contactsController = require('../../controllers/contacts-controller');

const schemas = require('../../schemas/contacts');

const { validateBody } = require('../../decorators')
const { validateBodyReq } = require('../../helpers')
const {validatePatchReqBody} = require('../../helpers')
const { isValidId, authenticate, upload } = require("../../middlewares");

router.use(authenticate);

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post("/", upload.single("avatar"), validateBody(schemas.contactAddSchema), contactsController.addContact);

router.delete("/:contactId", isValidId, contactsController.deleteContactById);

router.put(
  "/:contactId", isValidId, validateBodyReq, validateBody(schemas.contactAddSchema),contactsController.updateContactById
);

router.patch("/:contactId/favorite", isValidId, validatePatchReqBody, validateBody(schemas.contactUpdateFavoriteSchema), contactsController.updateStatusContact);

module.exports = router;
