# Spideyverse

A kinetic, mobile-responsive fan experience inspired by the visual energy of Sony Pictures Animation's Spider-Verse films. Built with Svelte 5, TypeScript, and Vite 8.

## Run locally

```bash
bun install
bun run dev
```

Production checks:

```bash
bun run check
bun run build
```

## Creative system

- Three live color dimensions: Miles, Gwen, and 2099
- Official Sony promotional hero artwork with comic-print textures
- CSS halftones, misregistration, torn-paper panels, and responsive collage layouts
- Collider instability control that drives the page's visual energy
- Reduced-motion support and keyboard-visible controls
- Original browser-generated ambient mix using the Web Audio API

## Music note

The site does not bundle music from the film soundtracks because those recordings require a license. The current `toggleSound` implementation in `src/App.svelte` creates an original low-volume ambient loop and only starts after a user gesture. If you have licensed audio, replace that function with an `<audio>` source stored under `public/audio/`.

## Attribution

This is an unofficial fan-made project. Spider-Man: Into the Spider-Verse, Spider-Man: Across the Spider-Verse, and related characters belong to their respective copyright holders. The hero banner is sourced from the official Sony Pictures film page. Character cutouts are credited through source links on each dossier card.
