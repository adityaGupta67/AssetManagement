
import { apiRequest } from "./client";

export async function login(username, password) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!data?.access_token) {
    throw new Error(
      "Login response did not contain an access_token"
    );
  }

  localStorage.setItem("access_token", data.access_token);

  return data;
}

export async function getMe() {
  return apiRequest("/auth/me");
}

export function logout() {
  localStorage.removeItem("access_token");
}
    