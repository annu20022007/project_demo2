export default function AsteroidCard({ asteroid }) {
  const closeData = asteroid.close_approach_data[0];
  const velocity =
    closeData.relative_velocity.kilometers_per_hour;

  const isHazardous = asteroid.is_potentially_hazardous_asteroid;
  const distance =
    closeData.miss_distance.kilometers;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-md">
      <h2 className="text-xl font-bold text-cyan-400">
        {asteroid.name}
      </h2>

      <p className="text-sm text-gray-300 mt-2">
        Velocity: <span className="text-white">
          {Math.round(velocity)} km/h
        </span>
      </p>

      <p className="text-sm text-gray-300">
        Distance: <span className="text-white">
          {Math.round(distance)} km
        </span>
      </p>

      <p className={`mt-2 text-sm font-semibold ${
        isHazardous ? "text-red-400" : "text-green-400"
      }`}>
        {isHazardous ? "Potentially Hazardous" : "Safe"}
      </p>
    </div>
  );
}
