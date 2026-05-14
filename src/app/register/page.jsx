"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 400) {
        toast.error("User already registered");
      } else if (res.status === 401) {
        toast.error("Email and password required");
      } else if (res.status === 201) {
        toast.success("User registered successfully");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="h-screen grid place-content-center">
      <div className="w-md mx-auto p-5 rounded border">
        <h2 className="text-3xl text-center my-2">Register</h2>
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
            className="w-full py-2 rounded bg-blue-500 text-white mt-5 "
          >
            {loading ? (
              <Loader2 className="mx-auto h-6 w-6 animate-spin" />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
