"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../../lib/auth";
import { logout } from "../../lib/auth";

export default function Dashboard() {
  const router = useRouter();


  useEffect(() => {
    const user = getUser();
    if (!user) router.push("/login");
  }, [router]);

  const asteroids = [
    {
      id: "1",
      name: "Apophis",
      velocity: "30 km/s",
      risk: "High",
      close: true,
      hazardous: true,
    },
    {
      id: "2",
      name: "Bennu",
      velocity: "12 km/s",
      risk: "Low",
      close: false,
      hazardous: false,
    },
    {
      id: "3",
      name: "Didymos",
      velocity: "20 km/s",
      risk: "Medium",
      close: true,
      hazardous: false,
    },
    {
      id: "4",
      name: "Aliass",
      velocity: "40 km/s",
      risk: "Critical",
      close: true,
      hazardous: true,
    },
  ];

  const [query, setQuery] = useState("");


<button
  onClick={() => {
    logout();
    router.push("/login");
  }}
>
  Logout
</button>


  useEffect(() => {
    asteroids.forEach((a) => {
      if (a.hazardous && a.close) {
        alert(`STAY SAFE! ${a.name} is hazardous and close!`);
      }
    });
  }, []);

  const filtered = asteroids.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Asteroid Dashboard</h1>

  
      <input
        type="text"
        placeholder="Search asteroid..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
      />

     
      {filtered.map((a) => (
        <div
          key={a.id}
          className="border border-gray-700 p-4 mb-3 rounded"
        >
          <p><b>Name:</b> {a.name}</p>
          <p><b>Velocity:</b> {a.velocity}</p>
          <p><b>Risk:</b> {a.risk}</p>
          <p>
            <b>Status:</b>{" "}
            {a.hazardous ? "Hazardous " : "Safe"}
          </p>
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="text-gray-400">No asteroid found.</p>
      )}
    </div>
  );
}
