"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, logout } from "@/lib/auth";
import Button from "@/components/ui/button";
import { useState } from "react";

import AsteroidCard from "@/components/AsteroidCard";


const ASTEROIDS = [
  { id: "1", name: "Apophis", danger: true },
  { id: "2", name: "Bennu", danger: false },
  { id: "3", name: "Didymos", danger: false },
];



export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  const [query, setQuery] = useState("");

  const filteredAsteroids = ASTEROIDS.filter((a) =>a.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

     
      <input
        type="text"
        placeholder="Search asteroids..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-6 p-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Results */}
      {filteredAsteroids.length === 0 ? (
        <p className="text-gray-400">No asteroids found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAsteroids.map((asteroid) => (
            <AsteroidCard key={asteroid.id} asteroid={asteroid} />
          ))}
        </div>
      )}
    </div>
  );
}
