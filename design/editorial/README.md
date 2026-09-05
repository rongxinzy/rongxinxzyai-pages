# 知远 · 工作图谱

Reference: https://www.lennysnewsletter.com/p/how-to-turn-your-ai-into-a-world

Direction: an editorial work atlas. Paper, ink, vermilion and a photographed paper bridge connecting source material to output. Generated with the built-in image tool; the four PNGs are section references, not page backgrounds. The hero photograph is the only generated production asset.

## Implementation specification

- Paper `#f7f6f2`, ink `#252821`, vermilion `#c34b32`, muted `#66685e`, line `#d3d3c9`. No tint over the photo.
- Display typography: Chinese Songti / Noto Serif CJK / serif; English Georgia. Body and controls: system sans-serif. Chinese headings 88px hero / 54px section at 1440px, scaling down to 36px / 32px on mobile. Body 16–18px. No external font dependency.
- Page width 1440px with 4.5vw gutters. Full-bleed photo and dark boundary band. Square buttons, hairline tables, open numbered rows. Navigation in normal flow. One red four-point mark in the hero.
- Home order: header, two-line title, 3:1 still life, description and download action, platform rule; scenario tabs and interactive workbench; local/model/permission boundaries; release-aware download rows; footer.
- Enterprise order: header; title + native architecture diagram; three delivery rows; comparison table; email and existing QR assets; footer.
- Native controls and all copy remain HTML. Scenario demo is explicitly labeled and uses local fixtures only; run, permission, denial, completion, replay, and artifact preview are real UI states.
- Motion: short opacity/translate entry for demo rows, hover arrow movement. No continuous background timers or scroll hijacking. Respect reduced motion.
- Mobile: stack hero actions, horizontal scenario tabs, stack workflow and output, wrap download actions, accessible disclosure navigation, horizontally scrollable comparison table.

## Fact corrections to generated concepts

Generated mockup filler is not product evidence. Replace its absolute no-upload assertion with the actual cloud-provider boundary; retain contract-qualified enterprise scope, real copyright and existing QR codes. Do not use generated sample numbers, invented SLA promises, or fabricated project claims. Download availability must come from `/api/release`; retain installation and signing notes.

## Image prompts

Concepts: coordinated editorial work-atlas website sections for ZhiYuan; paper #f7f6f2, ink #252821, vermilion #c34b32; art-book typography, hairline rules, square native HTML controls; no gradients, glows, badges or card grids. Home: two-line Chinese headline with a panoramic architectural desk still life. Workflow: three scenario selectors, numbered process, interactive document workbench. Download: dark boundary band and release rows. Enterprise: architecture, delivery rows, comparison and contact.

Production photo: recreate only the concept's panoramic still life, approximately 3:1; folded paper bridge, archival folder and documents, red wooden sphere, brushed aluminum block, books, warm afternoon sunlight. No UI, text, logo, overlays or gradients. Saved to `public/editorial/work-bridge.jpg`.
