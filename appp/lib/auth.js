// lib/auth.js

const USER_KEY = "cosmic_user";

// save user on login
export function login(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// get logged-in user
export function getUser() {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

// check if logged in
export function isLoggedIn() {
  return !!getUser();
}

// logout user
export function logout() {
  localStorage.removeItem(USER_KEY);
}
