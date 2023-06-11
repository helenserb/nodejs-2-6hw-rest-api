const Contact = require("../models/contact");
const { HttpError } = require("../helpers");
const {ctrlWrapper} = require("../decorators")

const getAllContacts = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
};

// const getContactById = async (req, res) => {
//     const { contactId } = req.params;
//     const result = await contactsService.getContactById(contactId);

//     if (!result) {
//       throw HttpError(404);
//     }

//     res.json(result);

// };

const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

// const updateContactById = async (req, res) => {
//     const { contactId } = req.params;
//     const result = await contactsService.updateContact(contactId, req.body);

//     if (!result) {
//       throw HttpError(404);
//     }

//     res.json(result);
// };

// const deleteContactById = async (req, res) => {
//     const { contactId } = req.params;
//     const result = await contactsService.removeContact(contactId);

//     if (!result) {
//       throw HttpError(404);
//     }

//     res.json({ message: "contact deleted" });
// };

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  // getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  // deleteContactById: ctrlWrapper(deleteContactById),
  // updateContactById: ctrlWrapper(updateContactById),
};