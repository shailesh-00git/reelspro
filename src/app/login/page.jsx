"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="h-screen grid place-content-center">
      <div className="w-md mx-auto p-5 rounded border">
        <h2 className="text-3xl text-center my-2">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border p-1 rounded w-full my-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-1 rounded w-full my-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-500 text-white mt-5"
          >
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
