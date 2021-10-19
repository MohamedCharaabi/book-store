import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import Header from "../../componnents/header";
import Modal from "../../componnents/modal";

interface Props {}

enum Pagination {
  HEAD = "head",
  PREV = "prev",
  STIll = "still",
  NEXT = "next",
  END = "end",
}

interface Book {
  author: string;
  id: number;
  title: string;
  category: string;
}

const BookManag: FC = (props: Props) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [pagesLimits, setPagesLimits] = useState<Pagination>(Pagination.STIll);

  const getBooks = async () => {
    try {
      const response = await axios.get<Book[]>(
        `http://localhost:5000/api/books/bb?page=${page}`
      );
      response.data.length > 0 && setBooks(response.data);
      response.data.length < 5
        ? setPagesLimits(Pagination.END)
        : setPagesLimits(Pagination.STIll);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, [page]);

  //handle modal
  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(openModal);
    setOpenModal(!openModal);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return (
      <div className="h-screen">
        <div className=" grid place-content-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className=" w-full h-screen grid place-content-center">
      <div className="card"></div>
    </div>
  );
};

export default BookManag;
