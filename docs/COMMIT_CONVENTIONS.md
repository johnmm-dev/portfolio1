# Commit message convention

```
[TAG] [Area] [Area...] Short title (60-70 chars)

Area1:
- what changed
- what changed

Area2:
- what changed
```

- **Tags** used so far: `[ADD]`, `[FIX]`. Add a new tag when a commit doesn't
  fit either.
- **Areas** are the page/section touched (e.g. `Homepage`, `Me`, `Skills`), or
  `Setup` for scaffolding/config/infrastructure work that isn't page-specific.
  List more than one area if the commit spans several.
- Title line: tags + areas + a short title, kept to roughly 60-70 characters.
- No "Body:" label — when a commit spans multiple areas, group the bullets
  under each area's name directly.
- Always show the drafted commit message and wait for approval before running
  `git commit`.
- No AI/agent co-author trailer (e.g. no `Co-Authored-By: Claude...`) — this
  is a professional portfolio repo, keep the history clean of that.
