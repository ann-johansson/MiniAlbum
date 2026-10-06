import { afterEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import { api, type CreatedIdResponse } from "./api";

afterEach(() => vi.unstubAllGlobals());

describe("MiniAlbum REST client", () => {
  it("uses ID-only responses for both create calls", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 201, json: async () => ({ id: 7 }) });
    vi.stubGlobal("fetch", fetchMock);
    const album = { title: "Autumn", description: "A weekend" };
    const photo = { title: "Leaves", description: "", fileName: "leaves.jpg" };

    expectTypeOf(api.createAlbum).returns.toEqualTypeOf<Promise<CreatedIdResponse>>();
    expectTypeOf(api.createPhoto).returns.toEqualTypeOf<Promise<CreatedIdResponse>>();
    expect(await api.createAlbum(album)).toEqual({ id: 7 });
    expect(await api.createPhoto(7, photo)).toEqual({ id: 7 });
    expect(fetchMock.mock.calls[0]?.[0]).toMatch(/\/api\/albums$/);
    expect(fetchMock.mock.calls[0]?.[1]).toMatchObject({ method: "POST", body: JSON.stringify(album) });
    expect(fetchMock.mock.calls[1]?.[0]).toMatch(/\/api\/albums\/7\/photos$/);
    expect(fetchMock.mock.calls[1]?.[1]).toMatchObject({ method: "POST", body: JSON.stringify(photo) });
  });

  it("keeps the three existing read endpoints", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => [] });
    vi.stubGlobal("fetch", fetchMock);
    await api.getAlbums();
    await api.getAlbum(7);
    await api.getPhotos(7);
    expect(fetchMock.mock.calls.map(([url]) => String(url).match(/\/api\/albums.*/)?.[0])).toEqual([
      "/api/albums", "/api/albums/7", "/api/albums/7/photos",
    ]);
  });

  it("rejects unsuccessful API responses", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 400, text: async () => "Invalid album" }));
    await expect(api.createAlbum({ title: "", description: "" })).rejects.toThrow("Invalid album");
  });
});