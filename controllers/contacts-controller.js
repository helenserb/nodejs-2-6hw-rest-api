const Joi = require("joi");

const contactsService = require("../models/contacts");
const { HttpError } = require("../helpers");
const {ctrlWrapper} = require("../decorators")

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
});

const getAllContacts = async (req, res) => {
    const result = await contactsService.listContacts();
    res.json(result);
};

const getContactById = async (req, res, ) => {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);

    if (!result) {
      throw HttpError(404, `Contact with id:${contactId} not found!`);
    }

    res.json(result);

};

const addContact = async (req, res) => {

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
};

const updateContactById = async (req, res) => {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);

    if (!result) {
      throw HttpError(404, `Contact with id:${contactId} not found!`);
    }

    res.json(result);
};

const deleteContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);

    if (!result) {
      throw HttpError(404, `Contact with id:${contactId} not found!`);
    }

    res.json({ message: "contact deleted" });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
};