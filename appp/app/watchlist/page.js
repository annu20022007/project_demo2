"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import AsteroidCard from "@/components/AsteroidCard";

export default function WatchlistPage() {
  const router = useRouter();
  const [watchlist, setWatchlist] = useState([]);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, []);

  // Load saved watchlist from localStorage (or backend)
  useEffect(() => {
    if (isLoggedIn()) {
      const saved = localStorage.getItem("watchlist");
      if (saved) {
        setWatchlist(JSON.parse(saved));
      }
    }
  }, []);

  if (!isLoggedIn()) return null; // prevents flash before redirect

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="text-gray-400">You have not added any asteroids yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((asteroid) => (
            <AsteroidCard key={asteroid.id} asteroid={asteroid} />
          ))}
        </div>
      )}
    </div>
  );
}
