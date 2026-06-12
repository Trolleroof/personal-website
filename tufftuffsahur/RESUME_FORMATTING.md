# Nikhil LaTeX Resume Formatting

Canonical reference for resumes in `tufftuffsahur/`. **Gold standard:** `Nikhil_Prabhu_CortexAI.tex`.

## File layout

```
tufftuffsahur/
├── preamble.tex          # Jake's Resume base (margins, macros) — do not fork per resume
├── resume-spacing.tex    # Shared spacing overrides — input in every resume
├── Nikhil_Prabhu_*.tex   # Role-specific content only
└── Nikhil_Prabhu_*.pdf   # Compile output
```

## Required preamble chain

Every resume `.tex` must start with:

```latex
\input{preamble.tex}
\input{resume-spacing.tex}

\begin{document}
```

Then header, then `\small` before the first `\section`.

## Margins (do not hack)

- Use `preamble.tex` margins as-is (`fullpage` + Jake adjustments).
- **Never** use `\enlargethispage`, `\addtolength{\textheight}`, or extra negative vspace to force one page.
- If content overflows: trim wording or merge skill lines — not margin hacks.

## Skills section

**Do:** one category per line in an `itemize` list.

```latex
\section{Skills}
\begin{itemize}[leftmargin=0.15in, label={}, nosep, topsep=2pt, itemsep=3pt, parsep=0pt]
  \item \textbf{Languages:} Python, C++, TypeScript, JavaScript
  \item \textbf{Data + Embodied AI:} ...
\end{itemize}
\vspace{-4pt}
```

**Don't:** `\quad` multi-column layout, `\footnotesize{... \\ ... \quad ...}` — causes broken wraps.

## Experience / projects

- Wrap entries in `\resumeSubHeadingListStart` … `\resumeSubHeadingListEnd`.
- Bullets: `\resumeItemListStart` … `\resumeItemListEnd` with `\resumeItem{...}` per bullet.
- Indent `\resumeSubheading` and lists consistently inside the list environment.
- Section gap after list: `\vspace{-4pt}` (not `-6pt` or tighter).

## Publications

**Do:** one publication per `\resumeItem`, with bullets via `\resumeItemListStart`:

```latex
\section{Publications}
  \resumeItemListStart
    \resumeItem{\textbf{Paper Title} --- Venue, Year.}
    \resumeItem{\textbf{Second Paper} --- Venue, Year.}
  \resumeItemListEnd
```

**Don't:** cram multiple papers into one `\resumeItem` separated by periods.

## One-page fit checklist

1. Compile: `cd tufftuffsahur && tectonic Nikhil_Prabhu_<Role>.tex`
2. `pdfinfo Nikhil_Prabhu_<Role>.pdf | grep Pages` → must be `Pages: 1`
3. `pdftotext -f 2 -l 2 Nikhil_Prabhu_<Role>.pdf -` → must be empty
4. Every bullet line in Experience/Projects/Publications must start with `•`
5. No overlapping subheading lines (title / subtitle / date)
6. No content clipped at bottom margin

## Spacing values (from `resume-spacing.tex`)

| Macro | Setting | Why |
|-------|---------|-----|
| `\resumeSubheading` after tabular | `\vspace{-5pt}` | Not `-7pt` (overlap) |
| `\resumeItemListStart` | `topsep=2pt, itemsep=2pt` | Not `nosep` + `topsep=0pt` (crushed bullets) |
| `\resumeItemListStart` | `label=\textbullet` | Reliable bullets in nested lists |
| `\resumeItemListEnd` | `\vspace{-4pt}` | Not `-5pt` or more (pulls next job into bullets) |
| Between sections | `\vspace{-4pt}` | Moderate; not `-6pt` stacks |

## Body font

- Header contact line: `\small` inside `\begin{center}`
- Everything after header: `\small` once before first section
- Do not double-stack `\footnotesize` on skills + body

## Content trimming (when one page is tight)

Trim in this order before touching spacing:

1. Merge Backend + Infra into one skills line
2. Shorten longest bullets (keep metrics and impact)
3. Merge two short bullets into one semicolon-separated bullet
4. Shorten publication venue names

Do **not** remove bullets, overlap subheadings, or use `\enlargethispage`.

## Compile

```bash
cd tufftuffsahur && tectonic Nikhil_Prabhu_CortexAI.tex
```

`pdflatex` may not be installed; `tectonic` is the supported compiler on this machine.
