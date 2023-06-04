const express = require('express')

const router = express.Router()

const contactsService = require("../../models/contacts")

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
      const error = newError("Not Found");
      error.code = 404;
      throw error;
          }
          res.json(result);
        }
  catch (error) {
    const { status = 500, message = "Server error" } = error; 
      res.status(status).json({
        message,
      });
    }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
