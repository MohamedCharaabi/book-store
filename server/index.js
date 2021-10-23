import express from "express";
import cors from "cors";

import booksRoutes from "./routes/books.js";
import contactsRoutes from "./routes/contacts.js";
import usersRoutes from "./routes/users.js";
import { db_conn } from "./config/database.js";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

// app.use(checkTable);
app.use("/api/books", booksRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/users", usersRoutes);
db_conn.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
});
