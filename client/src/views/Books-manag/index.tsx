import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import {
  useAuthHeader,
  useAuthUser,
  useIsAuthenticated,
  withSignIn,
} from "react-auth-kit";
import { Redirect } from "react-router";
import Header from "../../componnents/header";
import Modal from "../../componnents/modal";
import { Book } from "../../types";

interface Props {}

enum Pagination {
  HEAD = "head",
  PREV = "prev",
  STIll = "still",
  NEXT = "next",
  END = "end",
}

const BookManag: FC = (props: Props) => {
  const isAuthenticated = useIsAuthenticated();
  const userData = useAuthUser();
  const authHeader = useAuthHeader();

  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [pagesLimits, setPagesLimits] = useState<Pagination>(Pagination.STIll);

  const getBooks = async () => {
    try {
      const response = await axios.get<Book[]>(
        `http://localhost:5000/api/books/bb?page=${page}`,
        {
          headers: {
            Authorization: authHeader().substring(7),
          },
        }
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
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          authorization: userData()?.token,
        },
      });
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (!isAuthenticated || userData()?.role !== "a") {
    return <Redirect to="/" />;
  }

  if (isLoading) {
    return (
      <div className="h-screen w-screen grid place-content-center">
        <div className=" animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className=" overflow-hidden">
      <Header fixed={true} />

      <div className="mt-7 relative">
        <div className="flex justify-end w-full px-7 ">
          <button
            className="border-blue-600 border-2 py-2 px-4 rounded text-blue-500 "
            onClick={handleOpenModal}
          >
            Add Book
          </button>
        </div>
        {/* table */}
        <div className="flex  mt-3 flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Author
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Cover
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {books.map((book) => (
                      <tr key={book.title} className="py-2">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {/* <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={book.author}
                                alt=""
                              />
                            </div> */}

                            <div className="text-sm font-medium text-gray-900">
                              {book.author}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {book.title}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {book.genre}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 "
                              src={book.cover_url}
                              alt=""
                            />
                          </div>
                        </td>

                        <td className="px-6 py-4 flex whitespace-nowrap text-sm items-center font-medium">
                          <a href="#">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 text-green-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </a>

                          <a
                            // href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(book.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 text-red-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* pagination */}
        <div className="flex justify-center items-center mt-2 space-x-1">
          <a
            onClick={() => {
              page > 0 && setPage(page - 1);
            }}
            className="flex items-center px-4 py-2 text-gray-500 bg-gray-300 hover:bg-blue-400 rounded-md hover:text-white"
          >
            Previous
          </a>

          <a
            onClick={() => {
              setPage(0);
            }}
            className={` ${
              page === 0 ? "bg-yellow-500" : "bg-gray-200"
            } px-4 py-2 text-gray-700  rounded-md hover:bg-blue-400 hover:text-white`}
          >
            1
          </a>
          <a
            onClick={() => {
              setPage(1);
            }}
            className={` ${
              page === 1 ? "bg-yellow-500" : "bg-gray-200"
            } px-4 py-2 text-gray-700  rounded-md hover:bg-blue-400 hover:text-white`}
          >
            2
          </a>
          <a
            onClick={() => {
              setPage(2);
            }}
            className={` ${
              page === 2 ? "bg-yellow-500" : "bg-gray-200"
            } px-4 py-2 text-gray-700  rounded-md hover:bg-blue-400 hover:text-white`}
          >
            3
          </a>
          <a
            onClick={() => {
              pagesLimits === Pagination.STIll && setPage(page + 1);
            }}
            className="px-4 py-2 font-bold text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white"
          >
            Next
          </a>
        </div>
      </div>
      {/* add book modal */}
      <div
        className={` ${
          openModal && "absolute"
        } top-12  bottom-0 right-0  grid place-items-center  bg-gray-700 overflow-scroll scrollbar-hidden`}
      >
        {openModal && <Modal setOpen={setOpenModal} openState={openModal} />}
      </div>
    </div>
  );
};

export default BookManag;
