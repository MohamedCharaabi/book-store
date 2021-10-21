import axios from "axios";
import React, { FC, FormEvent, useState } from "react";
import Header from "../../componnents/header";

import { handleError, handleSuccess } from "../../componnents/SweetAlert";

const Modal: FC = () => {
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await axios.post("http://localhost:5000/api/contacts", formData);
      setProcessing(false);
      return handleSuccess({
        title: "Success",
        text: "Your message has been sent",
      });
    } catch (error: any) {
      setProcessing(false);
      handleError({
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="h-screen">
      <Header fixed={true} />
      <div className="flex  md:justify-center md:items-center px-7 h-full">
        <form className="w-full max-w-lg " onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Yuri"
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                type="email"
                placeholder="example@yahoo.com"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {/* <p className="text-gray-600 text-xs italic">
                Make it as long and as crazy as you'd like
              </p> */}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-subject"
              >
                Subject
              </label>

              <textarea
                className="form-textarea mt-1 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                rows={3}
                placeholder="Enter some long form content."
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              ></textarea>
            </div>
          </div>
          <div className="  mb-2">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <div className="flex justify-center flex-wrap -mx-3 mb-2 mt-2">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500-500 focus:border-blue-700 active:bg-blue-700 transition ease-in-out duration-150 cursor-not-allowed "
                >
                  <svg
                    className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white ${
                      !processing && "hidden"
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {processing ? "Processing" : "Send"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
