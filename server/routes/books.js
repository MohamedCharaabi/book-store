import express from "express";
import {
  getBook,
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  searchBook,
  getBooksWithLimits,
} from "../controllers/books.js";
import { checkBooksTable } from "../middlewers/book.js";
import { verifyToken } from "../middlewers/users.js";

const router = express.Router();

router.get("/", checkBooksTable, getBooks);
router.get("/bb", verifyToken, checkBooksTable, getBooksWithLimits);
router.get("/:id", checkBooksTable, getBook);
router.post("/", verifyToken, checkBooksTable, addBook);
router.patch("/:id", verifyToken, checkBooksTable, updateBook);
router.delete("/:id", verifyToken, checkBooksTable, deleteBook);
router.get("/search/:term", checkBooksTable, searchBook);

export default router;
