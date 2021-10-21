import axios from "axios";
import { Book } from "../types";

// import dotenv from "dotenv";
// dotenv.config();

const API_URL = process.env.REACT_APP_API_URL ;


 const getBooks = async () => {
     console.log(API_URL);
   try {
      const response = await axios.get<Book[]>(`${API_URL}/books`);
      console.log(response.data);
      const books = response.data;
      return books;
   }
    catch (error) {
        throw error;
        }
};


export {getBooks}