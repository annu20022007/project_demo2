export default function AsteroidCard({ asteroid }) {
  return (
    <div className="p-4 rounded-lg bg-zinc-800 border border-zinc-700">
      <h2 className="text-xl font-semibold">{asteroid.name}</h2>

      <p className={asteroid.danger ? "text-red-400" : "text-green-400"}>
        {asteroid.danger ? "Potentially Hazardous" : "Safe"}
      </p>
    </div>
  );
}
