import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-4">Welcome to the NASA API Demo!</h1>
      <p className="text-lg mb-8">Explore the wonders of space with our interactive application.</p>
      <Image
        src="/nasa-logo.png"
        alt="NASA Logo"
        width={200}
        height={100}
      />
    </div>
  );
}