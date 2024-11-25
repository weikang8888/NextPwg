import React from "react";
import LoginForm from "./LoginForm";

export default function Login() {
	return (
		<div className="w-full h-screen flex justify-center items-center bg-background">
			<div className=" flex flex-col justify-center items-center rounded-2xl shadow-lg py-16 px-12 bg-foreground">
				<h1 className="text-title text-3xl mb-10">Login Page</h1>
				<LoginForm />
			</div>
		</div>
	);
}
