import { NextResponse } from 'next/server';

// 1. THE LOGIC (Internal Function)
async function getCleanedData() {
  const API_KEY = process.env.NASA_API_KEY;
  const today = new Date().toISOString().split('T')[0];
  
  const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&api_key=${API_KEY}`, {
    next: { revalidate: 3600 } 
  });

  if (!res.ok) throw new Error("NASA API Down");
  
  const data = await res.json();
  const rawList = data.near_earth_objects[today] || [];

  return rawList.map(item => {
    const dia = item.estimated_diameter.kilometers.estimated_diameter_max;
    const dist = parseFloat(item.close_approach_data[0].miss_distance.kilometers);
    const score = (dia / dist) * 1000000;

    return {
      id: item.id,
      name: item.name.replace(/[()]/g, ""),
      size: `${dia.toFixed(2)} km`,
      distance: `${Math.round(dist).toLocaleString()} km`,
      threatScore: score.toFixed(1),
      isHazardous: item.is_potentially_hazardous_asteroid
    };
  });
}

// 2. THE ROUTE (The actual API Handler)
export async function GET() {
  try {
    const asteroids = await getCleanedData();
    return NextResponse.json(asteroids);
  } catch (error) {
    return NextResponse.json({ error: "Mission Control Error" }, { status: 500 });
  }
}
