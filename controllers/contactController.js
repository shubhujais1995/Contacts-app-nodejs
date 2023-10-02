const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
  console.log("get contacts call");
  const contacts = await Contact.find();
  console.log("found contact", contacts);
  res.status(200).send(contacts);
});

// @desc Create Contact
// @router POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
  console.log("called");
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,  
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

// @desc Update Contact
// @router PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
  console.log('contact called')
  const contactId = req.params.id;
  const allContacts = await Contact.find();
  const contact = allContacts.find((c) => c.id === contactId);
  console.log('contact found ', contact)
  if(!contact) {
    res.status(404);
    throw new Error("Contact not found"); 
  }
  
  console.log(contact.user_id.toString() , ' s ', req.user.id);

  if (contact.user_id.toString() !== req.user.id) {
    res.status(404);
    throw new Error("User don't have permission to update other user contacts");
  }

  const updatedContact = await Contact.findOneAndUpdate(
    { _id:  contactId },
    { $set: req.body },
    { new: true}
  );
  console.log( ' updated- ',updateContact);
  res.status(200).send(updateContact);
});

// @desc Delete Contact
// @router DELET /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contactId = req.params.id;
  const allContacts = await Contact.find();
  const contactDetail = allContacts.find((c) => c.id === contactId)
  if(!contactDetail) {
    res.status(404);
    throw new Error("Contact not found"); 
  }
  if (contactDetail.user_id.toString() !== req.user.id) {
    res.status(404);
    throw new Error("User don't have permission to update other user contacts");
  }


  const contact = await Contact.deleteOne({_id: req.params.id});
  console.log('deleted ' , contact);
  res.status(200).send('contact deleted');
});

// @desc Get Contact
// @router GET /api/contacts/:id
// @access private
const getContactById = asyncHandler(async (req, res) => {
  
  const contactId = req.params.id;
  const allContacts = await Contact.find();
  const contact = allContacts.find((c) => c.id === contactId)
  if(!contact) {
    res.status(404);
    throw new Error("Contact not found"); 
  }
  res.status(200).send(contact);
});

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getContactById,
};
