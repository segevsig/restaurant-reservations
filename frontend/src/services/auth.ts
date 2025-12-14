import { API_URL } from "../config";

export async function register(data: {
  email: string;
  password: string;
  name: string;
}) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function login(data: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(body?.error || `HTTP ${res.status}`);
  }
    return body;

}
