import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowLeft, Leaf, Plus, RotateCcw } from "lucide-react";
import { api, type Photo } from "@/lib/api";
import { Button, Field, Modal, SkeletonGrid, StatusBox, printPalette, useSubmit } from "@/components/ui-kit";


export default function AlbumPage() {
  const { albumId = "" } = useParams();
  useEffect(() => { document.title = "Album — MiniAlbum"; }, []);
  const [open, setOpen] = useState(false);
  const album = useQuery({ queryKey: ["album", albumId], queryFn: () => api.getAlbum(albumId) });
  const photos = useQuery({ queryKey: ["photos", albumId], queryFn: () => api.getPhotos(albumId) });

  return (
    <div>
      <Link to="/" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft aria-hidden="true" className="size-4" /> All albums
      </Link>

      {album.isLoading ? (
        <div role="status" className="mt-6 h-24 w-2/3 animate-pulse rounded-md bg-secondary"><span className="sr-only">Opening your album…</span></div>
      ) : album.error ? (
        <div className="mt-6">
          <StatusBox title="Couldn’t open this album" text="It may be unavailable, or the collection couldn’t be reached." action={<Button variant="ghost" onClick={() => album.refetch()}><RotateCcw aria-hidden="true" className="size-4" /> Try again</Button>} />
        </div>
      ) : (
        <section className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="mb-3 flex items-center gap-2 text-xs text-moss"><Leaf aria-hidden="true" className="size-4" /> Album No. {albumId.padStart(2, "0")}</p>
            <h1 className="font-display text-5xl text-foreground sm:text-6xl">{album.data?.title}</h1>
            {album.data?.description && (
              <p className="mt-3 max-w-xl text-muted-foreground">{album.data.description}</p>
            )}
          </div>
           <Button className="self-start sm:self-auto" onClick={() => setOpen(true)}><Plus aria-hidden="true" className="size-4" /> Add photo</Button>
        </section>
      )}

      {album.data && !album.error && (
        <div className="mt-10">
          <div className="mb-7 flex items-center justify-between border-b border-border pb-4 text-xs text-muted-foreground">
            <span>The pages within</span>
            <span className="tabular-nums">{photos.data ? `${photos.data.length} ${photos.data.length === 1 ? "photo" : "photos"}` : "Gathering photos…"}</span>
          </div>
          {photos.isLoading ? (
            <SkeletonGrid tall />
          ) : photos.error ? (
            <StatusBox
              title="Couldn't load photos"
              text="Your photos couldn’t be reached. Try again in a moment."
              action={<Button variant="ghost" onClick={() => photos.refetch()}><RotateCcw aria-hidden="true" className="size-4" /> Try again</Button>}
            />
          ) : !photos.data?.length ? (
            <StatusBox
              title="A story waiting to unfold"
              text="Add your first photo to fill these pages."
              action={<Button onClick={() => setOpen(true)}><Plus aria-hidden="true" className="size-4" /> Add photo</Button>}
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
               {photos.data.map((p, i) => <PhotoCard key={p.id} photo={p} number={i + 1} />)}
            </div>
          )}
        </div>
      )}

      <AddPhotoModal key={`${albumId}-${open}`} albumId={albumId} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

function PhotoCard({ photo, number }: { photo: Photo; number: number }) {
  const initial = (photo.title || photo.fileName || "?").trim().charAt(0).toUpperCase();
  return (
    <figure className="group paper-surface min-w-0 rounded-sm border border-border bg-card p-3 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
      <div className={`photo-print paper-surface relative flex aspect-[4/3] flex-col items-center justify-center ${printPalette(photo.fileName || photo.title)}`}>
        <span className="absolute left-7 top-6 text-[10px]">MINIALBUM / PRINT {String(number).padStart(2, "0")}</span>
        <Leaf aria-hidden="true" className="absolute right-7 top-6 size-5 stroke-1" />
        <span aria-hidden="true" className="font-display text-7xl italic">
          {initial}
        </span>
        <span className="mt-1 text-[10px]">Photo placeholder</span>
      </div>
      <figcaption className="px-2 pb-3 pt-5">
        <h3 className="font-display text-2xl text-card-foreground">{photo.title}</h3>
        {photo.description && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{photo.description}</p>}
        <p className="mt-4 truncate border-t border-border pt-3 text-xs text-muted-foreground" title={photo.fileName}>{photo.fileName}</p>
      </figcaption>
    </figure>
  );
}

function AddPhotoModal({ albumId, open, onClose }: { albumId: string; open: boolean; onClose: () => void }) {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const { busy, error, run } = useSubmit();

  return (
    <Modal open={open} onClose={onClose} title="Add photo">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          run(async () => {
            await api.createPhoto(albumId, {
              title: title.trim(),
              description: description.trim(),
              fileName: fileName.trim(),
            });
            await qc.invalidateQueries({ queryKey: ["photos", albumId] });
            setTitle("");
            setDescription("");
            setFileName("");
            onClose();
          });
        }}
      >
        <Field label="Title" value={title} onChange={setTitle} required placeholder="Harbour at dusk" />
        <Field label="File name" value={fileName} onChange={setFileName} required placeholder="harbour.jpg" />
        <Field label="Description" value={description} onChange={setDescription} textarea />
        {error && <p role="alert" className="text-sm text-destructive">Couldn’t add the photo. Please try again.</p>}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={busy || !title.trim() || !fileName.trim()}>
            {busy ? "Adding…" : "Add photo"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
