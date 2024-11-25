import React from "react";
import RegisterForm from "./RegisterForm";

export default function Register() {
	return (
		<div className="w-full h-screen flex justify-center items-center bg-[#121212]">
			<div className="bg-[#1E1E1E] flex flex-col justify-center items-center rounded-2xl shadow-lg py-16 px-12">
				<h1 className="text-white text-3xl mb-10">Register User</h1>
				<RegisterForm />
			</div>
		</div>
	);
}
