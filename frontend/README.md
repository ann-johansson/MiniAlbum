# MiniAlbum (static SPA)

Plain Vite + React + TypeScript frontend for the MiniAlbum ASP.NET Core API.

## Setup
    cp .env.example .env      # set VITE_API_URL to your API address
    npm install
    npm run dev               # local development
    npm run build             # static output in dist/

`VITE_API_URL` is baked in at build time, so set it before `npm run build`
(e.g. as a Docker build arg). The API must allow CORS from the frontend origin.

## nginx
Serve `dist/` and fall back to index.html so refreshing /albums/:id works:

    location / {
        root /usr/share/nginx/html;
        try_files $uri /index.html;
    }

## Structure
    index.html
    src/main.tsx            entry: React Query + Router providers
    src/App.tsx             header, footer, routes (/ and /albums/:albumId)
    src/pages/HomePage.tsx  album list + create album
    src/pages/AlbumPage.tsx album details, photos + add photo
    src/components/         shared UI (buttons, fields, dialog)
    src/lib/api.ts          the only place that talks to the API
    src/styles.css          Tailwind + autumn design tokens
