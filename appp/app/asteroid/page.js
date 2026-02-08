
import AsteroidCard from "@/components/AsteroidCard";
import { useEffect, useState } from "react";
import { fetchAllAsteroids } from "@/lib/api";

export default function AsteroidPage() {
  const [asteroids, setAsteroids] = useState([]);

  useEffect(() => {
    async function getAsteroids() {
      const data = await fetchAllAsteroids();  
      setAsteroids(data);
    }
    getAsteroids();
  }, []);

  if (!asteroids.length) return <p>Loading asteroids...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Near-Earth Objects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {asteroids.map((asteroid) => (
          <AsteroidCard key={asteroid.id} asteroid={asteroid} />
        ))}
      </div>
    </div>
  );
}
