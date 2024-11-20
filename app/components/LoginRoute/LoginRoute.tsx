"use client";

import { useRouter } from "next/navigation";

const LoginRoute = () => {
	const router = useRouter();

	return (
		<span
			className="text-danger cursor-pointer text-xl"
			onClick={() => {
				localStorage.removeItem("token");
				router.push("/login");
			}}>
			Logout
		</span>
	);
};

export default LoginRoute;
