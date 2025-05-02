import { MdAlternateEmail } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { GrGoogle } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { BsApple } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import AuthRequest from "../../Request/AuthRequest";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [currentAccount, setCurrentAccount] = useState();
  const togglePasswordView = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthRequest.loginUser(formData);
      console.log("Login success:", response.data);
      const { user } = response.data;

      Cookies.set("userEmail", user.email, { expires: 7 });
      Cookies.set("userName", user.name, { expires: 7 });

      navigate("/");
      // Bạn có thể lưu token / chuyển hướng sau khi login thành công
      // localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
    }
  };

  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-slate-500 shadow-lg">
        <img
          src="/public/light_primary.png"
          alt="logo"
          className="w-12 md:w-14"
        />
        <h1 className="text-lg md:text-xl font-semibold">Welcome Back</h1>
        <p className="text-xs md:text-sm text-gray-500 text-center">
          Don't have an account?{" "}
          <span
            className="text-white cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          {/* Email input */}
          <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl">
            <MdAlternateEmail />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password input */}
          <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl relative">
            <IoKeyOutline />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {showPassword ? (
              <FaRegEyeSlash
                className="absolute right-5 cursor-pointer"
                onClick={togglePasswordView}
              />
            ) : (
              <FaRegEye
                className="absolute right-5 cursor-pointer"
                onClick={togglePasswordView}
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 rounded-xl mt-3 hover:bg-blue-600 text-sm md:text-base"
          >
            Login
          </button>
        </form>

        <div className="relative w-full flex items-center justify-center py-3">
          <div className="w-2/5 h-[2px] bg-gray-800"></div>
          <h3 className="font-lora text-xs md:text-sm px-4 text-gray-500">
            Or
          </h3>
          <div className="w-2/5 h-[2px] bg-gray-800"></div>
        </div>

        <div className="w-full flex items-center justify-evenly md:justify-between gap-2">
          <div className="p-2 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800">
            <BsApple className="text-lg md:text-xl" />
          </div>
          <div className="p-2 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800">
            <GrGoogle className="text-lg md:text-xl" />
          </div>
          <div className="p-2 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800">
            <FaXTwitter className="text-lg md:text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
