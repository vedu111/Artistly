import { Card } from "@/components/ui/card";
import Image from "next/image";

export interface Artist {
  id: number;
  name: string;
  category: string;
  priceRange: string;
  location: string;
  languages: string[];
  image: string;
  // Accept extra props for forward compatibility
  [key: string]: any;
}

function getImageSrc(image: string) {
  if (!image) return "/globe.svg";
  // If already absolute or starts with /, return as is
  if (image.startsWith("http") || image.startsWith("/")) return image;
  // Otherwise, ensure it starts with /
  return "/" + image.replace(/^\/+/, "");
}

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Card className="flex flex-col items-center p-4">
      <Image
        src={getImageSrc(artist.image)}
        alt={artist.name}
        width={96}
        height={96}
        className="w-24 h-24 rounded-full object-cover mb-2"
      />
      <h3 className="font-semibold text-lg">{artist.name}</h3>
      <p className="text-sm text-gray-500">{artist.category}</p>
      <p className="text-sm text-gray-500">{artist.location}</p>
      <p className="text-sm text-gray-500">{artist.priceRange}</p>
      <button className="mt-2 px-4 py-1 rounded transition border border-primary bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-700">
        Ask for Quote
      </button>
    </Card>
  );
}