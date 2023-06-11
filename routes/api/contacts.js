const express = require('express')

const router = express.Router()

const contactsController = require('../../controllers/contacts-controller');

const schemas = require('../../schemas/contacts');

const { validateBody } = require('../../decorators')
const {validateBodyReq} = require ('../../helpers')

router.get("/", contactsController.getAllContacts);

// router.get("/:contactId", contactsController.getContactById);

router.post("/", validateBody(schemas.contactAddSchema), contactsController.addContact);

// router.delete("/:contactId", contactsController.deleteContactById);

// router.put(
//   "/:contactId", validateBodyReq, validateBody(schemas.contactAddSchema),contactsController.updateContactById
// );

module.exports = router;
