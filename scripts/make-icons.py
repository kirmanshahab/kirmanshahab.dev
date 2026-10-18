"""Generates the "KS" monogram favicon set from Geist Mono (plan 6.5.8).

Outputs src/app/icon.svg (adapts to dark tabs) and the 64px master SVG used by
scripts/render-icons.ts for favicon.ico and apple-icon.png.
Usage: python scripts/make-icons.py   (needs: pip install fonttools)
"""
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
FONT = ROOT / "node_modules/geist/dist/fonts/geist-mono/GeistMono-SemiBold.ttf"

font = TTFont(FONT)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
upm = font["head"].unitsPerEm
cap = font["OS/2"].sCapHeight

SIZE = 64          # viewBox
TEXT = 26          # font size in viewBox units
scale = TEXT / upm
advance = glyphs[cmap[ord("K")]].width * scale
total = advance * 2 - 1.5     # two letters, a touch of tightening
x0 = (SIZE - total) / 2
baseline = SIZE / 2 + cap * scale / 2

pen = SVGPathPen(glyphs)
for i, ch in enumerate("KS"):
    # Flip y (font units are y-up) and place each glyph.
    t = TransformPen(pen, (scale, 0, 0, -scale, x0 + i * (advance - 1.5), baseline))
    glyphs[cmap[ord(ch)]].draw(t)
path = pen.getCommands()

def svg(adaptive: bool) -> str:
    style = (
        "<style>.t{fill:#0C0A09}.g{fill:#FAFAF9}"
        "@media (prefers-color-scheme:dark){.t{fill:#FAFAF9}.g{fill:#09090B}}</style>"
        if adaptive
        else "<style>.t{fill:#0C0A09}.g{fill:#FAFAF9}</style>"
    )
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}">{style}'
        f'<rect class="t" width="{SIZE}" height="{SIZE}" rx="14"/>'
        f'<path class="g" d="{path}"/></svg>\n'
    )

(ROOT / "src/app/icon.svg").write_text(svg(True), encoding="utf-8")
(ROOT / "design").mkdir(exist_ok=True)
(ROOT / "design/monogram.svg").write_text(svg(False), encoding="utf-8")
print("wrote src/app/icon.svg and design/monogram.svg")
