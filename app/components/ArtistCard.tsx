import { Card, CardContent } from "@/components/ui/card";

export default function ArtistCard({ artist }: { artist: any }) {
  return (
    <Card className="flex flex-col items-center p-4">
      <img
        src={artist.image || "/public/globe.svg"}
        alt={artist.name}
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