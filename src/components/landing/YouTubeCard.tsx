import { ExternalLink, Play } from "lucide-react";

import { video } from "@/data/product";

export function YouTubeCard() {
  return (
    <a
      href={video.href}
      target="_blank"
      rel="noreferrer"
      className="group lux lux-rose gilt-line flex items-center gap-4 overflow-hidden rounded-2xl p-4 transition-transform hover:scale-[1.01]"
    >
      <div className="relative shrink-0 overflow-hidden rounded-xl">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="size-20 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute inset-0 grid place-items-center bg-black/30">
          <span className="grid size-9 place-items-center rounded-full bg-destructive text-destructive-foreground shadow-lg transition-transform group-hover:scale-110">
            <Play className="size-4 fill-current" />
          </span>
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <span className="text-xs font-bold text-muted-foreground">فيديو شرح المنتج</span>
        <h3 className="mt-0.5 text-sm font-extrabold leading-snug">{video.title}</h3>
        <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-destructive">
          <ExternalLink className="size-3" />
          شاهد على يوتيوب
        </span>
      </div>
    </a>
  );
}
