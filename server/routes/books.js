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

const router = express.Router();

router.get("/", checkBooksTable, getBooks);
router.get("/bb", checkBooksTable, getBooksWithLimits);
router.get("/:id", checkBooksTable, getBook);
router.post("/", checkBooksTable, addBook);
router.patch("/:id", checkBooksTable, updateBook);
router.delete("/:id", checkBooksTable, deleteBook);
router.get("/search/:term", checkBooksTable, searchBook);

export default router;
