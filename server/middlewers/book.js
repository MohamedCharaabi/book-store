import { con } from "../config/database.js";

export const checkBooksTable = async (req, res, next) => {
  // check if table exists
  const tableExists = await con.schema.hasTable("books");
  if (!tableExists) {
    // create table
    await con.schema.createTable("books", (table) => {
      table.increments("id").primary();
      table.string("title");
      table.string("author");
      table.string("genre");
      table.string("cover_url");
      table.string("description");
      table.string("price");
      table.string("stars");
    });
    next();
  } else {
    next();
  }
};
