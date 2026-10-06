<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All data comes from an external REST API via the single client in src/lib/api.ts (base URL from VITE_API_URL); no backend/Cloud in this project, because the user owns an ASP.NET Core API.
- Keep shared presentation helpers in ui-kit and use the existing Radix dialog for focus trapping and keyboard dismissal; this keeps page code readable without custom accessibility machinery.
- Select deterministic placeholder palettes by CSS class from global semantic tokens; this keeps print colors centralized without inline color generation.
- Pre-optimize shared UI dependencies in Vite; late discovery during hot updates can mix React module versions in an already-open preview.
