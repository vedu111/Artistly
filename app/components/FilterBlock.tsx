"use client";

interface Filters {
  category: string;
  location: string;
  priceRange: string;
}

interface FilterBlockProps {
  categories: string[];
  locations: string[];
  priceRanges: string[];
  filters: Filters;
  setFilters: (f: Filters) => void;
}

export default function FilterBlock({
  categories,
  locations,
  priceRanges,
  filters,
  setFilters,
}: FilterBlockProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Category Filter */}
      <select
        className="border rounded px-3 py-2 bg-white text-gray-900 border-gray-300 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700"
        value={filters.category}
        onChange={e => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="" className="bg-white text-gray-900 dark:bg-zinc-900 dark:text-zinc-100">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat} className="bg-white text-gray-900 dark:bg-zinc-900 dark:text-zinc-100">{cat}</option>
        ))}
      </select>
      {/* Location Filter */}
      <select
        className="border rounded px-3 py-2 bg-white text-gray-900 border-gray-300 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700"
        value={filters.location}
        onChange={e => setFilters({ ...filters, location: e.target.value })}
      >
        <option value="" className="bg-white text-gray-900 dark:bg-zinc-900 dark:text-zinc-100">All Locations</option>
        {locations.map(loc => (
          <option key={loc} value={loc} className="bg-white text-gray-900 dark:bg-zinc-900 dark:text-zinc-100">{loc}</option>
        ))}
      </select>
      {/* Price Range Filter */}
      <select
        className="border rounded px-3 py-2 bg-white text-gray-900 border-gray-300 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700"
        value={filters.priceRange}
        onChange={e => setFilters({ ...filters, priceRange: e.target.value })}
      >
        <option value="" className="bg-white text-gray-900 dark:bg-zinc-900 dark:text-zinc-100">All Price Ranges</option>
        {priceRanges.map(pr => (
          <option key={pr} value={pr} className="bg-white text-gray-900 dark:bg-zinc-900 dark:text-zinc-100">{pr}</option>
        ))}
      </select>
    </div>
  );
}