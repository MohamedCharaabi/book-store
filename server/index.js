import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import booksRoutes from "./routes/books.js";
import contactsRoutes from "./routes/contacts.js";
import usersRoutes from "./routes/users.js";
import { db_conn } from "./config/database.js";
import { verifyToken } from "./middlewers/users.js";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
    origin: "*",
  })
);
app.use(cookieParser());
// app.use(checkTable);
app.use("/api/books", booksRoutes);
app.use("/api/contacts", verifyToken, contactsRoutes);
app.use("/api/users", usersRoutes);
db_conn.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
});
