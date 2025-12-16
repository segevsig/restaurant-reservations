const TOKEN_KEY = "auth_token";
const USER_KEY = "user_info";

type StoredToken = {
  token: string;
  // optional: store when it was saved (or an expiry time)
  savedAt: number;
  expiresAt?: number; // unix ms
};

type UserInfo = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export function saveToken(token: string, opts?: { ttlMs?: number }) {
  const payload: StoredToken = {
    token,
    savedAt: Date.now(),
    expiresAt: opts?.ttlMs ? Date.now() + opts.ttlMs : undefined,
  };

  localStorage.setItem(TOKEN_KEY, JSON.stringify(payload));
}

export function saveUser(user: UserInfo) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): UserInfo | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as UserInfo;
    return parsed;
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  const raw = localStorage.getItem(TOKEN_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredToken;

    // basic validation
    if (!parsed?.token || typeof parsed.token !== "string") return null;

    // optional expiry check
    if (parsed.expiresAt && Date.now() >= parsed.expiresAt) {
      clearToken();
      return null;
    }

    return parsed.token;
  } catch {
    // corrupted storage
    clearToken();
    return null;
  }
}

export function hasToken(): boolean {
  return getToken() !== null;
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}


// import { hasToken, getToken } from "./authToken";

// if (!hasToken()) {
//   // redirect to /login
// }

// const token = getToken();