"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "../api";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const { token } = await login(email, password);
			localStorage.setItem("token", token);
			router.push("/");
		} catch (err) {
			setError(err instanceof Error ? err.message : "An unknown error occurred.");
		} finally {
			setLoading(false);
		}
	};
	return (
		<form className="w-[400px]" onSubmit={handleLogin}>
			<div className="flex flex-col gap-6 mx-6">
				<div>
					<label className="text-black text-lg font-medium mb-1 mx-2 block">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="w-full border-2 border-primary focus:outline-none focus:border-yellow-600 rounded-full p-[6px] text-black px-4"
					/>
				</div>
				<div>
					<label className="text-black text-lg font-medium mb-1 mx-2 block">Password</label>
					<input
						type="password"
						value={password}
						minLength={6}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="w-full border-2 border-primary focus:outline-none focus:border-yellow-600 rounded-full p-[6px] text-black px-4"
					/>
				</div>
			</div>
			<div className="flex flex-col items-center mt-12 mx-6">
				{error && <p className="text-red-500 mb-4">{error}</p>}
				<button
					type="submit"
					className={`${
						loading ? "bg-primary cursor-not-allowed" : "bg-primary hover:bg-yellow-600"
					} text-black font-semibold px-6 py-2 rounded-full mb-4 w-full`}
					disabled={loading}>
					{loading ? "Logging in..." : "Login"}
				</button>

				<Link href="/register" className="text-primary text-2xl font-medium hover:underline">
					Create an account
				</Link>
			</div>
		</form>
	);
};

export default LoginForm;
