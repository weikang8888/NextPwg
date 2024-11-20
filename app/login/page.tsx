import React from "react";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white flex flex-col justify-center items-center rounded-2xl shadow-lg py-16 px-12">
        <h1 className="text-black text-3xl mb-10">Login Page</h1>
        <LoginForm />
      </div>
    </div>
  );
}
