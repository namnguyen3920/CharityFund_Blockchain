import React, { useEffect, useState } from "react";
import * as FiIcons from "react-icons/fi";
import * as IoIcons from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../../public/light_primary.png";

const NavBarItem = ({ title, classProps, path }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };
  return (
    <li
      onClick={handleClick}
      className={`mx-4 cursor-pointer text-white hover:text-gray-300 transition-colors ${classProps}`}
    >
      {title}
    </li>
  );
};

export const NAV_LINKS = [
  { title: "About", path: "/" },
  { title: "Explorer", path: "/campaigns" },
];

const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const name = Cookies.get("userName");
    const email = Cookies.get("userEmail");

    if (name && email) {
      setIsLoggedIn(true);
    }
  });
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="flex w-full justify-center items-center">
        <div className="md:flex-[0.5] flex-initial justify-center items-center">
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </div>
        <ul className="md:flex hidden list-none flex-row justify-between items-center flex-initial">
          {NAV_LINKS.map(({ title, path }) => (
            <NavBarItem key={title} title={title} path={path} />
          ))}
          {isLoggedIn ? (
            <li
              onClick={() => navigate("/campaigns")}
              className="bg-green-600 py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-green-600"
            >
              Explore Campaign
            </li>
          ) : (
            <li
              onClick={() => navigate("/login")}
              className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              Login
            </li>
          )}
        </ul>
        <div className="flex relative">
          {!toggleMenu && (
            <FiIcons.FiMenu
              fontSize={28}
              className="md:hidden cursor-pointer"
              onClick={() => setToggleMenu(true)}
            />
          )}

          {toggleMenu && (
            <ul
              className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
              flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
            >
              <li className="text-xl w-full my-2">
                <IoIcons.IoIosClose
                  className="cursor-pointer"
                  fontSize={28}
                  onClick={() => setToggleMenu(false)}
                />
              </li>
              {["Explorer", "Wallets"].map((item, index) => (
                <NavBarItem
                  key={item + index}
                  title={item}
                  classprops="my-2 text-lg"
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
