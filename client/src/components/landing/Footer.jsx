import { FaBeer } from "react-icons/fa";
import logo from "../../../public/light_primary.png";
const Footer = () => (
  <div className="w-full flex md:justify-center justify-center items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <p className="text-white text-base text-center mx-2 cursor-pointer">
          Footer Content
        </p>
      </div>
    </div>

    <div className="flex justify-center items-center flex-col mt-5"></div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">@risinghope</p>
    </div>
  </div>
);

export default Footer;
