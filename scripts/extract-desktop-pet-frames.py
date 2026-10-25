#!/usr/bin/env python3
"""Crop idle (frame 0) from downloaded RongxinAI atlases into public/desktop-pets/."""
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "desktop-pets"
ATLAS = Path("/tmp/pet-atlas")
FRAMES = json.loads((ROOT / "scripts" / ".pet-frames.json").read_text())

CHARACTERS = [
    {"id": "xiaoyuan", "columns": 3, "rows": 2},
    {"id": "youli"},
    {"id": "tuantuan"},
    {"id": "mianmian"},
    {"id": "zhuli"},
    {"id": "yunmo"},
    {"id": "maixiao"},
]

CANVAS = 320
PAD = 0.08


def crop_idle(char: dict) -> Image.Image:
    cid = char["id"]
    img = Image.open(ATLAS / f"{cid}-atlas.png").convert("RGBA")
    if "columns" in char:
        w, h = img.size
        cw, ch = w // char["columns"], h // char["rows"]
        box = (0, 0, cw, ch)
    else:
        data = FRAMES[cid]
        x, y, fw, fh = data["frames"][0]
        box = (x, y, x + fw, y + fh)
    return img.crop(box)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    sprites = [crop_idle(c) for c in CHARACTERS]
    max_w = max(s.width for s in sprites)
    max_h = max(s.height for s in sprites)
    inner = int(CANVAS * (1 - 2 * PAD))
    scale = min(inner / max_w, inner / max_h)
    target_w = max(1, int(max_w * scale))
    target_h = max(1, int(max_h * scale))

    for char, sprite in zip(CHARACTERS, sprites):
        scaled = sprite.resize((target_w, target_h), Image.Resampling.LANCZOS)
        canvas = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
        ox = (CANVAS - scaled.width) // 2
        oy = CANVAS - scaled.height - int(CANVAS * PAD * 0.5)
        canvas.paste(scaled, (ox, oy), scaled)
        out = OUT / f"{char['id']}.webp"
        canvas.save(out, "WEBP", quality=88, method=6)
        print(f"Wrote {out} ({out.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
