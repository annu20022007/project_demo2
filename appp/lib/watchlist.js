// lib/watchlist.js

export function getWatchlist() {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("watchlist");
  return saved ? JSON.parse(saved) : [];
}

export function addToWatchlist(asteroid) {
  if (typeof window === "undefined") return;
  const list = getWatchlist();
  localStorage.setItem("watchlist", JSON.stringify([...list, asteroid]));
}

export function removeFromWatchlist(id) {
  if (typeof window === "undefined") return;
  const list = getWatchlist().filter((a) => a.id !== id);
  localStorage.setItem("watchlist", JSON.stringify(list));
}
