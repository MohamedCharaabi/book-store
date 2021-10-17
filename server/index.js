import express from "express";
import cors from "cors";
import mysql from "mysql";

import booksRoutes from "./routes/books.js";
import contactsRoutes from "./routes/contacts.js";

const PORT = process.env.PORT || 5000;

var conn = mysql.createConnection({
  host: "localhost", // Replace with your host name
  user: "root", // Replace with your database username
  password: "46284628", // Replace with your database password
  database: "book_db", // // Replace with your database Name
});

const app = express();
app.use(express.json());
app.use(cors());

// app.use(checkTable);
app.use("/api/books", booksRoutes);
app.use("/api/contacts", contactsRoutes);

conn.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
});
