import type { ImageMetadata } from 'astro';

const modules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/photos/*.{jpg,jpeg,png,webp}', {
  eager: true,
});

/** Photo library keyed by descriptive filename (without extension). */
export const PHOTOS: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path.split('/').pop()!.replace(/\.\w+$/, ''), mod.default]),
);

export const PHOTO_KEYS = Object.keys(PHOTOS).sort();

export type ResolvedImage =
  | { kind: 'asset'; meta: ImageMetadata }
  | { kind: 'upload'; src: string; width: number; height: number };

/**
 * Image values stored in the database are either a photo-library key
 * ("virnobyte-laptop-repair") or an uploaded file ("/uploads/name-1600x900.webp").
 */
export function resolveImage(value: string | null | undefined, fallback = 'virnobyte-circuit-board'): ResolvedImage {
  if (value && value.startsWith('/uploads/')) {
    const m = /-(\d+)x(\d+)\.\w+$/.exec(value);
    return { kind: 'upload', src: value, width: m ? +m[1] : 1600, height: m ? +m[2] : 1000 };
  }
  const meta = (value && PHOTOS[value]) || PHOTOS[fallback];
  return { kind: 'asset', meta };
}

/** Human label for the admin picker. */
export function photoLabel(key: string) {
  return key.replace(/^virnobyte-/, '').replace(/-/g, ' ');
}
