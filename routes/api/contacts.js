const express = require('express')

const router = express.Router()

const contactsController = require('../../controllers/contacts-controller');



router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", deleteContactById);

router.put("/:contactId", updateContactById);

module.exports = router;
