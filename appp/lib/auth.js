

// Check if user is logged in
export function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
}

// Login user by storing token
export function login(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
}

// Logout user by removing token
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}
