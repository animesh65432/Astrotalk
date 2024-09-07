import React, { useContext } from "react";
import Context from "@/Context";
import { signOut } from "next-auth/react";

const Navbar: React.FC = () => {
  const { color, ontoggole } = useContext(Context);

  return (
    <div
      className={`w-full p-4 flex justify-end ${
        color ? "bg-gray-800" : "bg-gray-200"
      } shadow-md`}
    >
      <button
        onClick={() => signOut()}
        className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 ml-2"
      >
        Logout
      </button>
      <button
        onClick={ontoggole}
        className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 ml-2"
      >
        {color ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default Navbar;
