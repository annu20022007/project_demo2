import Link from "next/link";

export default function HomePage() {
  return (
    <section className="text-center py-24">
      <h1 className="text-5xl font-bold mb-4">
        Welcome to ASTROMARK
      </h1>

      <p className="text-gray-400 mb-8">
        Track Near-Earth Objects in real time.giving you the latest data on asteroids, their size, distance, and potential threat level. Stay informed and keep an eye on the skies!
      </p>

      <Link
        href="/dashboard"
        className="px-6 py-3 bg-cyan-500 rounded-lg"
      >
        Launch Dashboard
      </Link>
    </section>
  );
}
