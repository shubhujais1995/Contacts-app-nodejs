const express = require("express");
const router = express.Router();

const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getContactById,
} = require("./../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");


// router.use(validateToken);

router.route("/")
    .get(getContacts)
    .post(createContact);

router
  .route("/:id")
  .get(getContactById)
  .put(updateContact)
  .delete(deleteContact);
  

// router.route("/").post(createContact);
// basically , if routes are simillar, it can be chained ...

// router.route("/:id").get(getContactById);

// router.route("/:id").delete(deleteContact);

module.exports = router;
