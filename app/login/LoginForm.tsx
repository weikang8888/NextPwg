"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "../api";
import Popup from "../components/Modal/page";
import errorIcon from "../../assets/Error.png";
import successIcon from "../../assets/Vector.png";
import { StaticImageData } from "next/image";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [popup, setPopup] = useState<{ message: string; imageSrc: string | StaticImageData; autoClose?: boolean } | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const router = useRouter();

  const validateInputs = () => {
    const errors: { username?: string; email?: string; password?: string } = {};

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email.";
    }
    if (!password.trim()) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    try {
      const { token } = await login(email, password);

      setPopup({ message: "Successfully login", imageSrc: successIcon, autoClose: true });
      localStorage.setItem("token", token);
      setTimeout(() => {
        setPopup(null);
        router.push("/");
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        setPopup({ message: error.message, imageSrc: errorIcon, autoClose: false });
      } else if (typeof error === "string") {
        setError(error);
        setPopup({ message: error, imageSrc: errorIcon, autoClose: false });
      } else {
        setError("An unknown error occurred.");
        setPopup({ message: "Failed", imageSrc: errorIcon, autoClose: false });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form className="w-[400px]" onSubmit={handleLogin} noValidate>
        <div className="flex flex-col gap-6 mx-6">
          <div>
            <label className="text-black text-lg font-medium mb-1 mx-2 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full border-2 ${validationErrors.email ? "border-red-500" : "border-primary"} focus:outline-none focus:border-yellow-600 rounded-full p-[6px] text-black px-4`}
            />
            {validationErrors.email && <p className="text-red-500 text-sm mt-1 mx-2">{validationErrors.email}</p>}
          </div>
          <div>
            <label className="text-black text-lg font-medium mb-1 mx-2 block">Password</label>
            <input
              type="password"
              value={password}
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full border-2 ${validationErrors.password ? "border-red-500" : "border-primary"} focus:outline-none focus:border-yellow-600 rounded-full p-[6px] text-black px-4`}
            />
            {validationErrors.password && <p className="text-red-500 text-sm mt-1 mx-2">{validationErrors.password}</p>}
          </div>
        </div>
        <div className="flex flex-col items-center mt-12 mx-6">
          <button
            type="submit"
            className={`${loading ? "bg-primary cursor-not-allowed" : "bg-primary hover:bg-yellow-600"} text-black font-semibold px-6 py-2 rounded-full mb-4 w-full`}
            disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <Link href="/register" className="text-primary text-2xl font-medium hover:underline">
            Create an account
          </Link>
        </div>
      </form>
      {popup && <Popup message={popup.message} imageSrc={popup.imageSrc} autoClose={popup.autoClose} onClose={() => setPopup(null)} />}
    </>
  );
};

export default LoginForm;
