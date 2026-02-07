"use client";

import { useEffect, useState } from "react";
import AsteroidCard from "@/components/AsteroidCard";

export default function Dashboard() {
  const [asteroids, setAsteroids] = useState([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/asteroids")
      .then(res => res.json())
      .then(data => {
        const neo =
          data.near_earth_objects[
            Object.keys(data.near_earth_objects)[0]
          ];
        setAsteroids(neo);
      });
  }, []);

  const handleSearch = () => {
    const found = asteroids.find(a =>
      a.name.toLowerCase().includes(query.toLowerCase())
    );

    setResult(found);

    if (
      found &&
      found.is_potentially_hazardous_asteroid
    ) {
      alert("⚠️ Potentially hazardous asteroid nearby. Stay safe!");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Asteroid Dashboard
      </h1>

      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 px-4 py-2 rounded bg-gray-800 text-white"
          placeholder="Search asteroid by name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-cyan-500 rounded text-black font-semibold"
        >
          Search
        </button>
      </div>

      {result && <AsteroidCard asteroid={result} />}
    </div>
  );
}
