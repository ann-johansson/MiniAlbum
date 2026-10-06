import { Link, Route, Routes } from "react-router-dom";
import { Leaf } from "lucide-react";
import HomePage from "@/pages/HomePage";
import AlbumPage from "@/pages/AlbumPage";

function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="font-display text-6xl text-foreground">404</h1>
      <p className="mt-2 text-sm text-muted-foreground">This page doesn't exist.</p>
      <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Go home</Link>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="sr-only z-50 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 border-b border-border px-6 py-6 sm:py-7">
        <Link to="/" aria-label="MiniAlbum home" className="flex items-center gap-3 font-display text-3xl font-semibold text-foreground">
          <Leaf aria-hidden="true" className="size-6 stroke-1 text-moss" />
          <span>Mini<span className="italic text-rust">Album</span></span>
        </Link>
        <span className="hidden text-xs text-muted-foreground sm:block">A few moments, kept forever.</span>
      </header>
      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-6xl flex-1 px-6 pb-20 pt-12 sm:pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 border-t border-border px-6 py-6 text-xs text-muted-foreground">
        <span>MiniAlbum · Small stories, kept together.</span>
        <Leaf aria-hidden="true" className="size-4 shrink-0 stroke-1 text-moss" />
      </footer>
    </div>
  );
}
