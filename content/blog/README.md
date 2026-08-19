# Blog posts

Each post is a folder with an `index.md` inside. Edit the markdown directly in Cursor — no TSX required.

## Layout

```
content/blog/
  my-post-slug/
    index.md          ← title, date, excerpt + body
  _template/
    index.md          ← copy this folder to start a new post
```

## URL

The **folder name** becomes the slug:

- `teaching-a-humanoid-to-score-a-penalty/` → `/blog/teaching-a-humanoid-to-score-a-penalty`

Folders starting with `_` (like `_template/`) are ignored.

## Frontmatter

Metadata goes in YAML at the top of `index.md`, between `---` lines:

```yaml
---
title: Post title
date: 2026-08-12
excerpt: Short blurb for the blog index.
links:
  - label: GitHub
    href: https://github.com/...
clips:
  - src: /blog/my-post/video.mp4
    label: Clip caption
---
```

- **title** — shown on the post page and blog list
- **date** — `YYYY-MM-DD`; sorted newest first on `/blog`
- **excerpt** — one paragraph for the index
- **links** — optional footer links (X thread, GitHub, etc.)
- **clips** — optional MP4s from `public/` (see below)

## Body

Everything below the frontmatter is Markdown:

- `## Heading` for sections
- Normal paragraphs separated by blank lines
- Lists, blockquotes, code blocks, links — all standard Markdown

Copy `_template/` when starting a new post, rename the folder, and edit `index.md`.

## Media

Put images and videos under `public/blog/<your-slug>/` and reference them in frontmatter or Markdown:

```markdown
![Diagram](/blog/my-post/diagram.png)
```

```yaml
clips:
  - src: /blog/my-post/demo.mp4
    label: Side-by-side replay
```

After saving, run `npm run dev` and open `/blog/your-slug` to preview.
