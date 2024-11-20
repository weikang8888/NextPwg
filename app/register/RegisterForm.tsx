"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { register } from "../api";

const RegisterForm = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("user");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			await register(username, email, password, role);
			router.push("/login");
		} catch (err) {
			setError(err instanceof Error ? err.message : "An unknown error occurred.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="w-[400px]" onSubmit={handleRegister}>
			<div className="flex flex-col gap-6 mx-6">
				<div>
					<label className="text-black text-lg font-medium mb-1 mx-2 block">Username</label>
					<input
						type="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						className="w-full border-2 border-primary focus:outline-none focus:border-yellow-600 rounded-full p-[6px] text-black px-4"
					/>
				</div>
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
				<div>
					<label className="text-black text-lg font-medium mb-1 mx-2 block">Role</label>
					<select
						value={role}
						onChange={(e) => setRole(e.target.value)}
						className="w-full border-2 border-primary focus:outline-none focus:border-yellow-600 rounded-full p-[8px] text-black px-4 appearance-none">
						<option value="admin">Admin</option>
						<option value="user">User</option>
					</select>
				</div>
			</div>
			<div className="flex flex-col items-center mt-8 mx-6">
				{error && <p className="text-red-500 mb-4">{error}</p>}
				<button
					type="submit"
					className={`${
						loading ? "bg-primary cursor-not-allowed" : "bg-primary hover:bg-yellow-600"
					} text-black font-semibold px-6 py-2 rounded-full mb-4 w-full`}
					disabled={loading}>
					{loading ? "Processing..." : "Register"}
				</button>

				<Link href="/login" className="text-primary text-2xl font-medium hover:underline">
					Back to Login Page
				</Link>
			</div>
		</form>
	);
};

export default RegisterForm;