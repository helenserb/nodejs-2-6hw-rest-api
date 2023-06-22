const Contact = require("../models/contact");
const { HttpError } = require("../helpers");
const {ctrlWrapper} = require("../decorators")

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...query} = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({owner, ...query},"",{skip, limit}).populate("owner", "email");

  res.json(result);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
  const result = await Contact.findById(contactId);

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);

};

const addContact = async (req, res) => {
  const {_id: owner} = req.user
  const result = await Contact.create({...req.body, owner });
    res.status(201).json(result);
};

const updateContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

  const deleteContactById = async (req, res) => {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndDelete(contactId);

      if (!result) {
        throw HttpError(404);
      }

      res.json({ message: "contact deleted" });
  };

  module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContactById: ctrlWrapper(deleteContactById),
    updateContactById: ctrlWrapper(updateContactById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
  };