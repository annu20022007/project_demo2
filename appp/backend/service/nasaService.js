export async function getAesteroidData() {
    const API_KEY=process.env.NASA_API_KEY;
    const date = new Date().toISOString().split('T')[0]; 
    try 
    {
        const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&api_key=${API_KEY}`);
         if (!res.ok) throw new Error("NASA API unreachable");
        const data = await res.json();
        const dailyAsteroids = data.near_earth_objects[date] || [];

        return dailyAsteroids.map(item => {
            const dia = item.estimated_diameter.kilometers.estimated_diameter_max;
            const dist = parseFloat(item.close_approach_data[0].miss_distance.kilometers);
            
            return {
            id: item.id,
            name: item.name,
            size: dia.toFixed(2) + " km",
            distance: Math.round(dist).toLocaleString() + " km",
            isHazardous: item.is_potentially_hazardous_asteroid,
            threatScore: (dia / dist * 1000000).toFixed(1) 
    };
  });
}
catch (error) {
    console.error("Cosmic Watch Error:", error);
    return [];
  }
}
