import type { Project } from '@/lib/data';

export type ProjectPreview =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; src: string; alt: string };

export function youtubeIdFromEmbed(url: string): string | null {
  const match = url.match(/embed\/([^?&/]+)/);
  return match?.[1] ?? null;
}

export function projectPreview(project: Project): ProjectPreview | undefined {
  const detail = project.detail;
  const gallery = detail?.galleryImages;
  if (gallery?.length) {
    const image = gallery.find((entry) => entry.emphasize) ?? gallery[0];
    return { kind: 'image', src: image.src, alt: image.alt };
  }

  const embed = detail?.videoEmbedUrl;
  if (embed) {
    const id = youtubeIdFromEmbed(embed);
    if (id) {
      return {
        kind: 'image',
        src: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
        alt: `${project.name} demo thumbnail`,
      };
    }
  }

  const video = detail?.videoFileUrl;
  if (video) {
    return { kind: 'video', src: video, alt: `${project.name} demo` };
  }

  return undefined;
}
