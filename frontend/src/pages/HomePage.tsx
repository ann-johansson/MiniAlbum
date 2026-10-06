import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowUpRight, Leaf, Plus, RotateCcw } from "lucide-react";
import { api } from "@/lib/api";
import { Button, Field, Modal, SkeletonGrid, StatusBox, printPalette, useSubmit } from "@/components/ui-kit";


export default function HomePage() {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.title = "MiniAlbum — Your photo albums"; }, []);
  const { data, isLoading, error, refetch } = useQuery({ queryKey: ["albums"], queryFn: api.getAlbums });

  return (
    <div>
      <section className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-medium text-moss"><Leaf aria-hidden="true" className="size-4" /> The collection</p>
          <h1 className="mt-3 font-display text-5xl text-foreground sm:text-6xl">Your albums<span className="text-rust">.</span></h1>
          <p className="mt-3 max-w-md text-muted-foreground">Small stories, kept together.</p>
        </div>
        <Button className="self-start sm:self-auto" onClick={() => setOpen(true)}><Plus aria-hidden="true" className="size-4" /> Create album</Button>
      </section>

      <div className="mb-7 mt-10 flex items-center justify-between gap-4 border-b border-border pb-4 text-xs text-muted-foreground">
        <span>Small stories · Personal collection</span>
        <span className="shrink-0 tabular-nums">{data ? `${data.length} ${data.length === 1 ? "album" : "albums"}` : "MiniAlbum"}</span>
      </div>
      <div>
        {isLoading ? (
          <SkeletonGrid />
        ) : error ? (
          <StatusBox
            title="Couldn't load albums"
            text="Your collection couldn’t be reached. Give it another try in a moment."
            action={<Button variant="ghost" onClick={() => refetch()}><RotateCcw aria-hidden="true" className="size-4" /> Try again</Button>}
          />
        ) : !data?.length ? (
          <StatusBox
            title="A little room for memories"
            text="Your first story starts with an album."
            action={<Button onClick={() => setOpen(true)}><Plus aria-hidden="true" className="size-4" /> Create album</Button>}
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((a, i) => (
              <Link
                key={a.id}
                to={`/albums/${a.id}`}
                className={`group paper-surface album-cover relative flex min-h-64 min-w-0 flex-col justify-between rounded-md border border-border p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift ${printPalette(a.title)}`}
              >
                <span className="flex items-center justify-between text-xs text-muted-foreground">
                  No. {String(i + 1).padStart(2, "0")}
                  <Leaf aria-hidden="true" className="size-5 stroke-1 text-moss" />
                </span>
                <div>
                  <h2 className="font-display text-3xl leading-tight text-card-foreground">{a.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {a.description || "A story of its own."}
                  </p>
                  <span className="mt-6 flex items-center justify-between border-t border-foreground/10 pt-3 text-xs font-medium text-foreground">
                    Open album <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <CreateAlbumModal key={String(open)} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

function CreateAlbumModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { busy, error, run } = useSubmit();

  return (
    <Modal open={open} onClose={onClose} title="New album">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          run(async () => {
            await api.createAlbum({ title: title.trim(), description: description.trim() });
            await qc.invalidateQueries({ queryKey: ["albums"] });
            setTitle("");
            setDescription("");
            onClose();
          });
        }}
      >
        <Field label="Title" value={title} onChange={setTitle} required placeholder="An autumn weekend" />
        <Field label="Description" value={description} onChange={setDescription} textarea placeholder="A few words about it" />
        {error && <p role="alert" className="text-sm text-destructive">Couldn’t create the album. Please try again.</p>}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={busy || !title.trim()}>{busy ? "Creating…" : "Create album"}</Button>
        </div>
      </form>
    </Modal>
  );
}
