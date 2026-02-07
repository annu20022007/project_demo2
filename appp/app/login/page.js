"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login, isLoggedIn } from "@/lib/auth";
import Button from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already logged in

useEffect(() => {
    if (isLoggedIn()) {
      router.push("/dashboard");
    }
  const handleSubmit = (e) => {
    e.preventDefault();
      if (username && password) {
      login("demo-token"); 
      router.push("/dashboard");
    } else {
      alert("Enter username and password");
    }
  };}, []);  

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg shadow-md w-80"
      >
        <h1 className="text-2xl font-bold mb-4 text-white">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded bg-gray-800 text-white"
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}

