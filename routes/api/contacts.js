const express = require('express')

const router = express.Router()
const Joi = require('joi');

const contactsService = require("../../models/contacts");

const { HttpError } = require('../../helpers')

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
});

router.get('/', async (req, res, next) => {
  try {
      const result = await contactsService.listContacts();
      res.json(result)
  }
  catch (error){
    res.status(500).json({
      message: error.message,
    })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);

    if (!result) {
      throw HttpError(404, `Contact with id:${contactId} not found!`)
    }
    
          res.json(result);
        }
  catch (error) {
    next(error);
    }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  }
  catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);

    if (!result) {
      throw HttpError(404, `Contact with id:${contactId} not found!`);
    }

    res.json(result);

  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
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

  } catch(error) {
    next(error);
  }
})

module.exports = router;
