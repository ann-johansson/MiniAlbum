// Centralized client for the MiniAlbum ASP.NET Core API.
const BASE_URL = String(import.meta.env["VITE_API_URL"] ?? "").replace(/\/$/, "");

export type Album = { id: number; title: string; description: string };
export type Photo = { id: number; title: string; description: string; fileName: string };
export type NewAlbum = { title: string; description: string };
export type NewPhoto = { title: string; description: string; fileName: string };
export type CreatedIdResponse = { id: number };

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed (${res.status})`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  getAlbums: () => request<Album[]>("/api/albums"),
  getAlbum: (id: string | number) => request<Album>(`/api/albums/${id}`),
  createAlbum: (body: NewAlbum) =>
    request<CreatedIdResponse>("/api/albums", { method: "POST", body: JSON.stringify(body) }),
  getPhotos: (albumId: string | number) => request<Photo[]>(`/api/albums/${albumId}/photos`),
  createPhoto: (albumId: string | number, body: NewPhoto) =>
    request<CreatedIdResponse>(`/api/albums/${albumId}/photos`, { method: "POST", body: JSON.stringify(body) }),
};
