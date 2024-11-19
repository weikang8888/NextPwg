import Link from "next/link";
import React from "react";

export default function Login() {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="bg-white flex flex-col justify-center items-center rounded-2xl py-24 px-32">
				<h1 className="text-black text-3xl mb-14">Login Page</h1>
				<form className="w-72">
					<div className="flex-col flex justify-center items-center gap-4">
						<div>
							<h2 className="text-black text-xl">Email</h2>
							<input type="email" name="email" required className="border p-2 mr-2" />
						</div>
						<div>
							<h2 className="text-black text-xl">Password</h2>
							<input type="password" name="password" required className="border p-2 mr-2" />
						</div>
					</div>
					<div className="flex flex-col mt-10">
						<button type="submit" className="bg-primary text-black px-4 py-2 rounded-2xl mb-5">
							Login
						</button>
						<Link href="/register" className="text-primary text-center text-xl">
							Create an account
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
