from __future__ import annotations

import html
import random
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[1]
PHOTO = ROOT / 'ANMOL.png'
OUT_DARK = ROOT / 'dark.svg'
OUT_LIGHT = ROOT / 'light.svg'

PORTRAIT_W, PORTRAIT_H = 300, 340
GROUPS = 60
SEED = 207

DETAILS = [
    ('Subject', 'Anmol Malviya'),
    ('Role', 'Full-Stack Developer'),
    ('Origin', 'Madhya Pradesh, India'),
    ('Education', 'B.Tech CSE (IoT + Cyber + Blockchain) · PIEMR'),
    ('Status', 'Building + Learning + Shipping'),
    ('ToolChain', 'VS Code · Git · Figma · Postman'),
    ('Core.Lang', 'JavaScript · TypeScript · Python · Java · C++'),
    ('Core.Frontend', 'React · Next.js · Tailwind · GSAP · Three.js'),
    ('Core.Backend', 'Node.js · Express · FastAPI'),
    ('Core.Database', 'MongoDB · PostgreSQL · MySQL'),
    ('Core.Infra', 'Vercel · Render · Netlify · Docker'),
    ('Grid.Mail', 'anmolmalviya4328@gmail.com'),
    ('Grid.Portfolio', 'anmolmalviya7.vercel.app'),
    ('Grid.LinkedIn', '/in/anmol-malviya27'),
    ('Grid.GitHub', '@Anmol-Malviya'),
    ('Grid.Instagram', '@anmol_20_7_'),
]

THEMES = {
    'dark': {
        'bg': '#070B16', 'panel': '#0A101F', 'chrome': '#22D3EE', 'portrait': '#A78BFA',
        'accent': '#10B981', 'primary': '#F8FAFC', 'muted': '#94A3B8', 'subtle': '#475569',
        'line': '#233149', 'bar': '#0B1222', 'chip': '#10192B', 'portrait_bg': '#08111F',
    },
    'light': {
        'bg': '#F8FAFC', 'panel': '#FFFFFF', 'chrome': '#0891B2', 'portrait': '#7C3AED',
        'accent': '#059669', 'primary': '#0F172A', 'muted': '#475569', 'subtle': '#94A3B8',
        'line': '#CBD5E1', 'bar': '#F1F5F9', 'chip': '#F8FAFC', 'portrait_bg': '#F8FAFC',
    },
}


def crop_and_preprocess(img: Image.Image) -> tuple[Image.Image, np.ndarray]:
    img = img.convert('RGB')
    fitted = ImageOps.fit(
        img,
        (PORTRAIT_W, PORTRAIT_H),
        method=Image.Resampling.LANCZOS,
        centering=(0.5, 0.42),
    )
    gray = ImageOps.grayscale(fitted)
    gray = ImageOps.autocontrast(gray, cutoff=1)
    gray = ImageEnhance.Contrast(gray).enhance(1.3)
    gray = gray.filter(ImageFilter.UnsharpMask(radius=3, percent=140, threshold=2))
    return gray, np.asarray(fitted).astype(np.float32)


def otsu_threshold(values: np.ndarray) -> float:
    vals = np.clip(values.ravel(), 0, 255).astype(np.uint8)
    hist = np.bincount(vals, minlength=256).astype(np.float64)
    total = hist.sum()
    if total == 0:
        return 25.0
    sum_total = np.dot(np.arange(256), hist)
    sum_b = 0.0
    w_b = 0.0
    best_var = -1.0
    best_t = 0
    for t in range(256):
        w_b += hist[t]
        if w_b == 0:
            continue
        w_f = total - w_b
        if w_f == 0:
            break
        sum_b += t * hist[t]
        m_b = sum_b / w_b
        m_f = (sum_total - sum_b) / w_f
        var_between = w_b * w_f * (m_b - m_f) ** 2
        if var_between > best_var:
            best_var = var_between
            best_t = t
    return float(best_t)


def subject_mask(rgb: np.ndarray) -> np.ndarray:
    k = 34
    border = np.concatenate([
        rgb[:k, :k].reshape(-1, 3),
        rgb[:k, -k:].reshape(-1, 3),
        rgb[k:PORTRAIT_H // 2, :12].reshape(-1, 3),
        rgb[k:PORTRAIT_H // 2, -12:].reshape(-1, 3),
    ], axis=0)
    bg = np.median(border, axis=0)
    diff = np.linalg.norm(rgb - bg, axis=2)
    dmax = max(float(diff.max()), 1.0)
    scaled = diff / dmax * 255.0
    threshold = max(otsu_threshold(scaled) / 255.0 * dmax, 24.0)

    mask = diff > threshold
    mask = ndimage.binary_closing(mask, structure=np.ones((5, 5)), iterations=2)
    mask = ndimage.binary_fill_holes(mask)

    labels, count = ndimage.label(mask)
    if count:
        sizes = ndimage.sum(mask, labels, range(1, count + 1))
        mask = labels == (int(np.argmax(sizes)) + 1)

    if mask.mean() < 0.12:
        cy, cx = PORTRAIT_H // 2, PORTRAIT_W // 2
        yy, xx = np.ogrid[:PORTRAIT_H, :PORTRAIT_W]
        fallback = ((xx - cx) / 138) ** 2 + ((yy - 178) / 168) ** 2 <= 1
        mask = mask | fallback

    return ndimage.binary_dilation(mask, iterations=1)


def floyd(gray: Image.Image) -> np.ndarray:
    dithered = gray.convert('1', dither=Image.Dither.FLOYDSTEINBERG)
    return np.asarray(dithered, dtype=np.uint8) > 0


def pixels_for_mode(gray: Image.Image, rgb: np.ndarray, mode: str) -> np.ndarray:
    bits = floyd(gray)
    if mode == 'dark':
        return (~bits) & subject_mask(rgb)
    return ~bits


def pixel_groups(mask: np.ndarray) -> list[str]:
    rng = random.Random(SEED)
    buckets: list[list[str]] = [[] for _ in range(GROUPS)]
    ys, xs = np.nonzero(mask)
    order = list(range(len(xs)))
    rng.shuffle(order)
    for idx_pos, idx in enumerate(order):
        x = int(xs[idx])
        y = int(ys[idx])
        buckets[idx_pos % GROUPS].append(f'M{x} {y}h0.72')
    return [''.join(bucket) for bucket in buckets]


def logo_layer(theme: dict[str, str]) -> str:
    portrait = theme['portrait']
    chrome = theme['chrome']
    accent = theme['accent']
    return f'''
      <g opacity="0">
        <text x="150" y="190" text-anchor="middle" font-size="58" font-weight="800" fill="{portrait}">&lt;/&gt;</text>
        <animate attributeName="opacity" begin="3.2s" dur="14.2s" repeatCount="indefinite" values="0;0;1;1;0;0;0;0;0" keyTimes="0;0.25;0.32;0.43;0.50;0.60;0.75;0.90;1"/>
      </g>
      <g opacity="0" transform="translate(91 110)">
        <path d="M59 18 L118 122 H0 Z" fill="{chrome}"/>
        <animate attributeName="opacity" begin="3.2s" dur="14.2s" repeatCount="indefinite" values="0;0;0;0;1;1;0;0;0" keyTimes="0;0.32;0.43;0.50;0.57;0.68;0.75;0.90;1"/>
      </g>
      <g opacity="0" transform="translate(150 170)" fill="none" stroke="{accent}" stroke-width="4">
        <ellipse rx="82" ry="30"/>
        <ellipse rx="82" ry="30" transform="rotate(60)"/>
        <ellipse rx="82" ry="30" transform="rotate(120)"/>
        <circle r="9" fill="{accent}" stroke="none"/>
        <animate attributeName="opacity" begin="3.2s" dur="14.2s" repeatCount="indefinite" values="0;0;0;0;0;0;1;1;0" keyTimes="0;0.43;0.50;0.57;0.68;0.75;0.82;0.93;1"/>
      </g>
    '''


def row_svg(label: str, value: str, y: int, theme: dict[str, str]) -> str:
    label_x = 490
    value_x = 1138
    approx_label_end = label_x + len(label) * 7.2 + 10
    approx_value_start = value_x - len(value) * 7.0 - 10
    line_start = min(approx_label_end, 760)
    line_end = max(approx_value_start, line_start + 18)
    value_length = min(max(len(value) * 7.2, 60), 420)
    return (
        f'<text x="{label_x}" y="{y}" font-size="14" fill="{theme["muted"]}">{html.escape(label)}</text>'
        f'<line x1="{line_start:.1f}" y1="{y - 4}" x2="{line_end:.1f}" y2="{y - 4}" stroke="{theme["line"]}" stroke-width="1" stroke-dasharray="2 5"/>'
        f'<text x="{value_x}" y="{y}" text-anchor="end" font-size="14" fill="{theme["primary"]}" textLength="{value_length:.1f}" lengthAdjust="spacingAndGlyphs">{html.escape(value)}</text>'
    )


def build_svg(mode: str, groups: list[str]) -> str:
    theme = THEMES[mode]
    rng = random.Random(SEED + (0 if mode == 'dark' else 1))
    portrait_paths = []
    for index, path_data in enumerate(groups):
        delay = 0.20 + index * (1.85 / GROUPS) + rng.uniform(-0.015, 0.015)
        portrait_paths.append(
            f'<path d="{path_data}" opacity="0"><animate attributeName="opacity" values="0;1" dur="0.85s" begin="{delay:.2f}s" fill="freeze"/></path>'
        )

    rows = []
    start_y = 153
    for index, (label, value) in enumerate(DETAILS):
        rows.append(row_svg(label, value, start_y + index * 25, theme))

    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1180" height="610" viewBox="0 0 1180 610" font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace" role="img" aria-label="Anmol Malviya — profile.sh --live">
<defs>
  <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="{theme['portrait']}"/><stop offset="0.5" stop-color="{theme['chrome']}"/><stop offset="1" stop-color="{theme['accent']}"/></linearGradient>
  <clipPath id="window"><rect x="2" y="2" width="1176" height="606" rx="18"/></clipPath>
</defs>
<rect x="2" y="2" width="1176" height="606" rx="18" fill="{theme['bg']}" stroke="{theme['line']}" stroke-width="2"/>
<g clip-path="url(#window)">
  <rect x="2" y="2" width="1176" height="606" fill="{theme['panel']}"/>
  <rect x="2" y="2" width="1176" height="46" fill="{theme['bar']}"/>
  <line x1="2" y1="48" x2="1178" y2="48" stroke="{theme['line']}"/>
  <circle cx="30" cy="25" r="5.5" fill="#ff5f56"/><circle cx="50" cy="25" r="5.5" fill="#ffbd2e"/><circle cx="70" cy="25" r="5.5" fill="#27c93f"/>
  <text x="590" y="29" text-anchor="middle" font-size="12" fill="{theme['muted']}">anmolmalviya4328@gmail.com — % ./profile.sh --live</text>

  <text x="38" y="74" font-size="10" letter-spacing="3" fill="{theme['subtle']}">VISUAL.MAP</text>
  <rect x="36" y="84" width="400" height="492" rx="10" fill="{theme['portrait_bg']}" stroke="{theme['chrome']}" stroke-opacity=".35"/>
  <g transform="translate(50 112) scale(1.24 1.27)" fill="none" stroke="{theme['portrait']}" stroke-width="0.72" stroke-linecap="round" shape-rendering="crispEdges">
    <g id="portrait">
      <animate attributeName="opacity" begin="3.2s" dur="14.2s" repeatCount="indefinite" values="1;1;1;0;0;0;0;0;1" keyTimes="0;0.16;0.22;0.30;0.52;0.75;0.90;0.96;1"/>
      {''.join(portrait_paths)}
    </g>
    {logo_layer(theme)}
  </g>
  <text x="236" y="552" text-anchor="middle" font-size="11" fill="{theme['muted']}">portrait → code → vercel → react → portrait</text>

  <text x="486" y="78" font-size="13" letter-spacing="3" fill="{theme['subtle']}">SYSTEM.INFO</text>
  <g transform="translate(1000 61)"><circle r="5" fill="#EF4444"><animate attributeName="opacity" values="1;.25;1" dur="1.2s" repeatCount="indefinite"/></circle><text x="12" y="4" font-size="12" fill="{theme['primary']}">LIVE</text></g>
  <g transform="translate(1048 57)"><rect width="102" height="25" rx="12.5" fill="{theme['chip']}" stroke="{theme['chrome']}" stroke-opacity=".45"/><text x="51" y="17" text-anchor="middle" font-size="14" fill="{theme['chrome']}">@Anmol-Malviya</text></g>
  {''.join(rows)}
</g>
</svg>'''


def main() -> None:
    if not PHOTO.exists():
        raise SystemExit(f'Missing portrait source: {PHOTO}')

    image = Image.open(PHOTO)
    gray, rgb = crop_and_preprocess(image)
    data_dir = ROOT / 'assets'
    data_dir.mkdir(exist_ok=True)

    for mode, output in [('dark', OUT_DARK), ('light', OUT_LIGHT)]:
        mask = pixels_for_mode(gray, rgb, mode)
        groups = pixel_groups(mask)
        output.write_text(build_svg(mode, groups), encoding='utf-8')
        np.save(data_dir / f'portrait_{mode}.npy', mask.astype(np.uint8))
        print(f'{mode}: {mask.sum()} dots · ink={mask.mean():.3f} · {output.stat().st_size / 1024:.1f}KB')


if __name__ == '__main__':
    main()
