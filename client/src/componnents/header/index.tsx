import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { LogOut } from "react-feather";
import { Link } from "react-router-dom";
import { Book } from "../../types";
import { useHistory } from "react-router-dom";
import { useScrollPosition } from "../../hooks/useScrollPosition";

interface Props {
  fixed: boolean;
}

const Index: FC<Props> = (props: Props) => {
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const signOut = useSignOut();
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [bookSeggestions, setBookSeggestions] = useState<Book[]>([]);
  // const [sticky, setSticky] = useState(false)
  // useScrollPosition(
  //   ({ prevPos, currPos }) => {
  //     const isShow = currPos.y > prevPos.y
  //     if (isShow !== sticky) setSticky(isShow)
  //   },
  //   [sticky]
  // )

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
      return () => {};
    });
  }, []);

  function handleToggleMenu(e: any) {
    e.preventDefault();
    setShowMenu(!showMenu);
  }

  const searchOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    let value = e.target.value;
    console.log(value);
    if (value.length > 0) {
      await axios
        .get<Book[]>(`http://localhost:5000/api/books/search/${value}`)
        .then((res) => {
          console.log(res.data);
          setBookSeggestions(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setBookSeggestions([]);
    }
  };

  const renderSuggestions = () => {
    console.log(bookSeggestions);

    if (bookSeggestions.length === 0) {
      return null;
    }
    console.log(bookSeggestions);
    return (
      <u>
        {bookSeggestions.slice(0, 5).map((book: Book) => {
          return (
            <li key={book.id} className="flex mt-5 px-2 py-1 hover:bg-blue-200">
              <img alt="author" className=" w-14 h-14" src={book.cover_url} />
              <div className="flex-col flex ml-2">
                <span>{book.title}</span>
                <span>{book.author}</span>
              </div>
            </li>
          );
        })}
      </u>
    );
  };

  console.log("authUser", authUser());

  return (
    <div
      className={`h-16 w-full sticky top-0 z-50 bg-gray-900 
       ${props.fixed === false ? !show && "hidden" : "block "}`}
    >
      {/* <!-- Navbar goes here --> */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              {/* <!-- Website Logo --> */}
              <Link to="/home">
                <a className="flex items-center py-4 px-2">
                  <img
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/c039b824474525.56334ce736de9.jpg"
                    alt="Logo"
                    className="h-9 w-9 mr-2"
                  />
                  <span className="font-semibold text-gray-500 text-base lg:text-lg">
                    Book Store
                  </span>
                </a>
              </Link>

              {/* <!-- Primary Navbar items --> */}
              <div className="hidden md:flex items-center space-x-1">
                <a
                  href="/home"
                  className="py-4 px-2 text-blue-500 border-b-4 text-sm lg:text-base border-blue-500 font-semibold "
                >
                  Home
                </a>
                <Link to="/home">
                  <a
                    // href="/home"
                    className="py-4 px-2 text-gray-500 font-semibold text-sm lg:text-base hover:text-blue-500 transition duration-300"
                  >
                    Services
                  </a>
                </Link>
                <Link to="/home">
                  <a className="py-4 px-2 text-gray-500 font-semibold text-sm lg:text-base hover:text-blue-500 transition duration-300">
                    About
                  </a>
                </Link>
                <Link to="/reclam">
                  <a
                    // href="/reclam"
                    className="py-4 px-2 text-gray-500 font-semibold text-sm lg:text-base hover:text-blue-500 transition duration-300"
                  >
                    Contact
                  </a>
                </Link>
              </div>
            </div>
            {/* search */}
            <div className="flex flex-col justify-center ">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    className="bg-gray-200  appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    placeholder="Search"
                    onChange={searchOnChange}
                  />
                  <div className="absolute  top-0 flex items-center h-full">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {/* search results*/}
                  <div className="absolute bg-white w-full">
                    {renderSuggestions()}
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Secondary Navbar items --> */}
            <div className="hidden md:flex items-center space-x-3 ">
              {isAuthenticated() ? (
                <>
                  <Link to="/profile">
                    <a className="py-4 px-2 text-gray-500 font-semibold text-sm lg:text-base hover:text-blue-500 transition duration-300">
                      {authUser()?.name ?? "User"}
                    </a>
                  </Link>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => {
                      signOut();
                      history.push("/login");
                    }}
                  >
                    <LogOut />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <a className="py-2 px-1 lg:px-2  text-sm lg:text-base font-medium text-gray-500 rounded hover:bg-blue-500 hover:text-white transition duration-300">
                      Log In
                    </a>
                  </Link>
                  <a
                    href=""
                    className="py-2 px-1 lg:px-2  text-sm lg:text-base font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
            {/* Mobile menu button  */}
            <div className="md:hidden flex items-center">
              <button
                className="outline-none mobile-menu-button"
                onClick={handleToggleMenu}
              >
                <svg
                  className=" w-6 h-6 text-gray-500 hover:text-blue-500 "
                  x-show="!showMenu"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <div className={`${!showMenu && "hidden"} lg:hidden mobile-menu`}>
          <ul className="">
            <Link to="/home">
              <li className="active">
                <a
                  href="index.html"
                  className="block text-sm px-2 py-4 text-white bg-blue-500 font-semibold"
                >
                  Home
                </a>
              </li>
            </Link>
            <Link to="/home">
              <li>
                <a className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">
                  Services
                </a>
              </li>
            </Link>
            <Link to="/home">
              <li>
                <a className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">
                  About
                </a>
              </li>
            </Link>
            <Link to="/reclam ">
              <li>
                <a className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">
                  Contact Us
                </a>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Index;
