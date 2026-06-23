// Centralized HTTP client. Points to a future FastAPI backend.
const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) throw new ApiError(await res.text().catch(() => res.statusText), res.status);
  return (await res.json().catch(() => ({}))) as T;
}

export async function httpForm<T>(path: string, formData: FormData): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { method: "POST", body: formData });
  if (!res.ok) throw new ApiError(await res.text().catch(() => res.statusText), res.status);
  return (await res.json().catch(() => ({}))) as T;
}
