import { useEffect, useState } from "react";

const measured = new Map<string, number>();

const SAMPLE = 128;
const ALPHA_FLOOR = 8;

export function useSpriteTopPadding(url: string): number | null {
  const [entry, setEntry] = useState<{ url: string; top: number } | null>(null);

  useEffect(() => {
    if (!url || measured.has(url)) return;

    let active = true;
    const image = new Image();
    /* sem isto o canvas fica "tainted" e getImageData lança */
    image.crossOrigin = "anonymous";

    image.onload = () => {
      const top = topPadding(image);
      measured.set(url, top);
      if (active) setEntry({ url, top });
    };

    image.src = url;

    return () => {
      active = false;
    };
  }, [url]);

  const cached = measured.get(url);
  if (cached !== undefined) return cached;

  return entry?.url === url ? entry.top : null;
}

function topPadding(image: HTMLImageElement): number {
  const canvas = document.createElement("canvas");
  canvas.width = SAMPLE;
  canvas.height = SAMPLE;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return 0;

  context.drawImage(image, 0, 0, SAMPLE, SAMPLE);

  let pixels: Uint8ClampedArray;
  try {
    pixels = context.getImageData(0, 0, SAMPLE, SAMPLE).data;
  } catch {
    return 0;
  }

  for (let y = 0; y < SAMPLE; y++) {
    for (let x = 0; x < SAMPLE; x++) {
      if (pixels[(y * SAMPLE + x) * 4 + 3] > ALPHA_FLOOR) return y / SAMPLE;
    }
  }

  return 0;
}
