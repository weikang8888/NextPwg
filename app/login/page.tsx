import React from "react";
import LoginForm from "./LoginForm";
import Popup from "../components/Modal/page";
import errorIcon from "../../assets/Error.png";
import successIcon from "../../assets/Vector.png";

export default function Login() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white flex flex-col justify-center items-center rounded-2xl shadow-lg py-16 px-12">
        <h1 className="text-black text-3xl mb-10">Login Page</h1>
        <LoginForm />
      </div>
      {/* <Popup message={"Failed"} imageSrc={errorIcon} /> */}
      {/* <Popup message={"Success"} imageSrc={successIcon} /> */}
    </div>
  );
}
