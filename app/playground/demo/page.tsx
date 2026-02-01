import { ExitBar, Shell } from "@/components/ui/3d-shell";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/cn";
import { cva } from "class-variance-authority";
import { type Anime, getAnimeRank } from "./api";

const buttonVariants = cva(
  "inline-flex items-center gap-1.5 p-2 text-start rounded-xl transition-colors text-xs [&_svg]:size-4 [&_svg]:flex-shrink-0",
  {
    variants: {
      active: {
        true: "bg-neutral-50/20 font-medium",
        false: "text-neutral-100/70 hover:bg-neutral-50/10",
      },
    },
  },
);

export default async function Page() {
  const ranking = await getAnimeRank();

  return (
    <>
      <Shell className="flex flex-row">
        <Sidebar />
        <ScrollArea className="flex-1 overflow-auto">
          <h2 className="font-medium text-xl mb-2">Trending</h2>
          <p className="text-xs text-neutral-50/80 mb-4">{ranking.data.length} series.</p>

          <div className="flex flex-row gap-2 items-center bg-neutral-950/20 rounded-xl px-2 mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 text-neutral-100/70"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              placeholder="Search..."
              className="text-xs bg-transparent placeholder:text-neutral-100/70 w-full py-2 focus-visible:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {ranking.data.map((anime) => (
              <AnimeItem key={anime.node.id} anime={anime.node} />
            ))}
          </div>
        </ScrollArea>
      </Shell>
      <ExitBar />
    </>
  );
}

function AnimeItem({ anime }: { anime: Anime }) {
  return (
    <div className="relative group cursor-pointer">
      <div className="absolute inset-0 opacity-0 bg-neutral-50/10 rounded-xl z-[-1] pointer-events-none transition-all group-hover:opacity-100 group-hover:scale-110" />
      <img
        alt="Picture"
        src={anime.main_picture.medium}
        className="w-full aspect-[3/4] bg-neutral-950/20 rounded-2xl mb-2 object-cover select-none"
      />
      <p className="text-xs font-medium mb-1">{anime.title}</p>
      <p className="text-xs text-neutral-50/80">{anime.studios?.map((s) => s.name).join()}</p>
    </div>
  );
}

function Sidebar() {
  const playlists = [
    {
      name: "Romance",
      color: "rgb(225,100,100)",
    },
    {
      name: "Actions",
      color: "rgb(100,100,225)",
    },
  ];

  return (
    <div className="flex flex-col p-2 w-[20%] min-w-[140px] bg-neutral-950/20">
      <h2 className="inline-flex justify-between items-center p-2 font-medium">
        Anime
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 text-neutral-50/80"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      </h2>
      <button className={cn(buttonVariants({ active: true }))}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 7.5 12" />
        </svg>
        Trending
      </button>
      <button className={cn(buttonVariants({ active: false }))}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
        Favourite
      </button>
      <button className={cn(buttonVariants({ active: false }))}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="m9 11 3 3L22 4" />
        </svg>
        Completed
      </button>
      <p className="text-xs font-medium px-2 mt-2">Playlists</p>
      <button className={cn(buttonVariants({ active: false }))}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
        All Playlists
      </button>
      {playlists.map((p) => (
        <button key={p.name} className={cn(buttonVariants({ active: false }))}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={p.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
          {p.name}
        </button>
      ))}
    </div>
  );
}
