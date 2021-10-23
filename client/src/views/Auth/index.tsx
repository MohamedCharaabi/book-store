import axios from "axios";
import React, { FC, useState } from "react";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { Redirect, useHistory } from "react-router";

import loginImage from "../../assets/img/login.jpg";
import { handleError, handleSuccess } from "../../componnents/SweetAlert";

const API_URL = process.env.REACT_APP_API_URL;

const Auth: FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const signIn = useSignIn();
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result: any = await axios.post(`${API_URL}/users/login`, formData);
      const authData = {
        name: result.data.name,
        email: result.data.email,
      };
      console.log(authData);
      if (
        signIn({
          token: result.data.token,
          expiresIn: 24 * 60 * 60,
          authState: result.data.authUserState,
          tokenType: "cookie",
        })
      ) {
        history.push("/home");
      } else {
        return handleError({ title: "Error", text: "Login Failed" });
      }
    } catch (error: any) {
      return handleError({ title: "Error", text: error });
    }
  };

  if (isAuthenticated()) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="flex ">
      <div className="w-1/2 h-screen hidden sm:block">
        <img src={loginImage} alt="login_illesteration" />
      </div>
      {/* form */}
      <div className=" w-full h-screen  sm:w-1/2 grid place-items-center">
        <div className="w-full  max-w-xs">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="example@yahoo.com"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          {/* <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Auth;
