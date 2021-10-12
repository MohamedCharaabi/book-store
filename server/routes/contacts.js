import express from "express";
import {
  addContact,
  deleteContact,
  getContact,
  getContacts,
  searchContact,
  updateContact,
} from "../controllers/contacts.js";
import { checkContactsTable } from "../middlewers/contact.js";

const router = express.Router();

router.get("/", checkContactsTable, getContacts);
router.get("/:id", checkContactsTable, getContact);
router.post("/", checkContactsTable, addContact);
router.patch("/:id", checkContactsTable, updateContact);
router.delete("/:id", checkContactsTable, deleteContact);
router.get("/search/:search", checkContactsTable, searchContact);

export default router;
