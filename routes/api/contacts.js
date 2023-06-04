const express = require('express')

const router = express.Router()

const contactsController = require('../../controllers/contacts-controller');



router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", contactsController.addContact);

router.delete("/:contactId", contactsController.deleteContactById);

router.put("/:contactId", contactsController.updateContactById);

module.exports = router;
