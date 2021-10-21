import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { Delete, Eye, Trash, Trash2 } from "react-feather";
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

interface Reclam {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
}

const ReclamManag: FC = (props: Props) => {
  const [reclams, setReclams] = useState<Reclam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pagesLimits, setPagesLimits] = useState<Pagination>(Pagination.STIll);

  const getReclams = async () => {
    try {
      const response = await axios.get<Reclam[]>(
        `http://localhost:5000/api/contacts/cc?page=${page}`
      );
      response.data.length > 0 && setReclams(response.data);
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
    getReclams();
  }, [page]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      setReclams(reclams.filter((reclam) => reclam.id !== id));
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
    <div className=" overflow-hidden">
      <Header fixed={true} />

      <div className="mt-7 relative">
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
                        First Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Last Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Subject
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reclams.map((reclam) => (
                      <tr key={reclam.first_name}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {reclam.first_name}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {reclam.last_name}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {reclam.email}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {reclam.subject.substring(0, 20)}
                          </div>
                        </td>

                        <td className="px-6 py-4 flex whitespace-nowrap text-sm font-medium">
                          <Eye color="green" />

                          <a
                            // href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(reclam.id);
                            }}
                          >
                            <Trash2 color="red" />
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
    </div>
  );
};

export default ReclamManag;
