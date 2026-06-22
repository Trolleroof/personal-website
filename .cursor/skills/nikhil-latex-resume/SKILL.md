---
name: nikhil-latex-resume
description: >-
  Format and compile Nikhil Prabhu Jake-style LaTeX resumes in tufftuffsahur/.
  Use when editing Nikhil_Prabhu_*.tex, fixing resume spacing, fitting one page
  within proper margins, skills/publications layout, or compiling resume PDFs.
---

# Nikhil LaTeX Resume

## Quick start

1. Read `tufftuffsahur/RESUME_FORMATTING.md` for full rules.
2. Canonical example: `tufftuffsahur/Nikhil_Prabhu_CortexAI.tex`.
3. Shared spacing: `tufftuffsahur/resume-spacing.tex` — must be `\input` after `preamble.tex`.

## Required file header

```latex
\input{preamble.tex}
\input{resume-spacing.tex}

\begin{document}
% header block ...
\small
\section{Education}
```

## Non-negotiables

- **One page** within Jake `preamble.tex` margins — no `\enlargethispage`, no `\textheight` hacks.
- **Skills:** `itemize`, one `\item` per category — never `\quad` two-column skills.
- **Publications:** one `\resumeItem` per paper inside `\resumeItemListStart`.
- **Bullets:** every `\resumeItem` must render with `•` (use `resume-spacing.tex` overrides).
- **Spacing:** subheading gap `-5pt` after tabular; bullet `topsep=2pt, itemsep=2pt`; section `\vspace{-4pt}`.

## Fit one page workflow

1. Edit content only in the role-specific `.tex` file.
2. Compile: `cd tufftuffsahur && tectonic Nikhil_Prabhu_<Role>.tex`
3. Verify:
   - `pdfinfo *.pdf | grep Pages` → `1`
   - `pdftotext -f 2 -l 2 *.pdf -` → empty
   - All experience/project/publication lines have bullets
   - No subheading overlap (title vs subtitle vs date)
4. If overflow: trim content per RESUME_FORMATTING.md — do not tighten spacing below documented values.

## Anti-patterns (learned from CortexAI fixes)

| Bad | Good |
|-----|------|
| `\enlargethispage{...}` | Trim bullets or merge skill lines |
| `nosep, topsep=0pt` on bullet lists | `topsep=2pt, itemsep=2pt` |
| `\vspace{-7pt}` after subheading | `\vspace{-5pt}` via `resume-spacing.tex` |
| Two papers in one `\resumeItem` | Two `\resumeItem` entries |
| `\footnotesize` skills with `\quad` columns | `itemize` with bold category labels |
| Global `\small` + crushed `nosep` lists | `\small` body + balanced list spacing |

## Role-specific files

| File | Target |
|------|--------|
| `Nikhil_Prabhu_CortexAI.tex` | Cortex AI |
| `Nikhil_Prabhu_Wayve.tex` | Wayve |
| `Nikhil_Prabhu_Weave.tex` | Weave |
| `Nikhil_Prabhu_Pave.tex` | Pave |
| `Nikhil_Prabhu_Proception.tex` | Proception |
| `Nikhil_Prabhu_GrayMatter.tex` | GrayMatter Robotics (GMR) |

When updating an older resume: add `\input{resume-spacing.tex}`, fix Skills to itemize format, fix Publications to separate items, apply `\small` after header, remove margin hacks, then compile and verify.

## Additional reference

Full checklist and spacing table: [tufftuffsahur/RESUME_FORMATTING.md](../../tufftuffsahur/RESUME_FORMATTING.md)
