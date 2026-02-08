"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../lib/auth";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    login(username);    
    router.push("/dashboard");
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 text-white mb-4"
        />
        <br />
        <button className="px-4 py-2 bg-blue-600 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
