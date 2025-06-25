"use client";
import { useEffect, useState } from "react";
import ArtistCard, { Artist } from "../components/ArtistCard";
import FilterBlock from "../components/FilterBlock";
import Header from "../components/Header";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loader from "../components/Loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Grid3X3,
  List,
  Star,
  MapPin,
  DollarSign,
  Users,
  SlidersHorizontal,
  X,
  ChevronDown,
  Music,
  Mic,
  Speaker,
  Disc,
  Calendar
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Footer = dynamic(() => import("../components/Footer"), { ssr: false });

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const categoryIcons = {
  "Singers": <Music className="w-4 h-4" />,
  "DJs": <Disc className="w-4 h-4" />,
  "Speakers": <Mic className="w-4 h-4" />,
  "Dancers": <Speaker className="w-4 h-4" />
};

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filtered, setFiltered] = useState<Artist[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    priceRange: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'price' | 'popular'>('popular');

  // Fetch artists data from JSON
  useEffect(() => {
    fetch("/data/artists.json")
      .then(res => res.json())
      .then((data: Artist[]) => {
        setArtists(data);
        setFiltered(data);
        setLoading(false);
      });
  }, []);

  // Extract unique filter options
  const categories = Array.from(new Set(artists.map(a => a.category)));
  const locations = Array.from(new Set(artists.map(a => a.location)));
  const priceRanges = Array.from(new Set(artists.map(a => a.priceRange)));

  // Enhanced filter logic with search and sorting
  useEffect(() => {
    let result = artists;
    // Apply filters
    if (filters.category) result = result.filter(a => a.category === filters.category);
    if (filters.location) result = result.filter(a => a.location === filters.location);
    if (filters.priceRange) result = result.filter(a => a.priceRange === filters.priceRange);
    // Apply search
    if (searchTerm) {
      result = result.filter(a => 
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'price':
          return parseFloat((a.priceRange || '').replace(/[^0-9]/g, '') || '0') - parseFloat((b.priceRange || '').replace(/[^0-9]/g, '') || '0');
        case 'popular':
        default:
          return (b.bookings || 0) - (a.bookings || 0);
      }
    });
    setFiltered(result);
  }, [filters, artists, searchTerm, sortBy]);

  const clearAllFilters = () => {
    setFilters({
      category: "",
      location: "",
      priceRange: "",
    });
    setSearchTerm("");
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length + (searchTerm ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-800">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-r from-primary/10 to-purple-500/10 py-16"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8" variants={fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Discover Amazing Artists
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Browse through our curated collection of verified performers and find the perfect artist for your next event
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div className="max-w-2xl mx-auto" variants={fadeInUp}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search artists, categories, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 focus:border-primary shadow-lg"
              />
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
            variants={staggerContainer}
          >
            {[
              { icon: <Users className="w-5 h-5" />, number: artists.length, label: "Total Artists" },
              { icon: <Star className="w-5 h-5" />, number: categories.length, label: "Categories" },
              { icon: <MapPin className="w-5 h-5" />, number: locations.length, label: "Cities" },
              { icon: <Calendar className="w-5 h-5" />, number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-lg"
                variants={fadeInUp}
              >
                <div className="flex justify-center mb-2 text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <main className="container mx-auto px-4 py-8">
        {/* Filters and Controls */}
        <motion.div 
          className="flex flex-col lg:flex-row gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Filter Controls */}
          <div className="lg:w-1/4">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-xs"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Search: {searchTerm}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm("")} />
                      </Badge>
                    )}
                    {filters.category && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {categoryIcons[filters.category as keyof typeof categoryIcons]}
                        {filters.category}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, category: "" }))} />
                      </Badge>
                    )}
                    {filters.location && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {filters.location}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, location: "" }))} />
                      </Badge>
                    )}
                    {filters.priceRange && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {filters.priceRange}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, priceRange: "" }))} />
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <FilterBlock
                categories={categories}
                locations={locations}
                priceRanges={priceRanges}
                filters={filters}
                setFilters={setFilters}
              />
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {filtered.length} Artist{filtered.length !== 1 ? 's' : ''} Found
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {activeFiltersCount > 0 ? 'Filtered results' : 'Showing all artists'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="appearance-none bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="name">Name A-Z</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price">Price: Low to High</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex rounded-lg border border-gray-300 dark:border-zinc-600 overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none px-3"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none px-3"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {filtered.length === 0 ? (
                  <motion.div
                    key="no-results"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-20"
                  >
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                      <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">No artists found</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                      Try adjusting your filters or search terms to find the perfect artist for your event.
                    </p>
                    <Button onClick={clearAllFilters} variant="outline">
                      Clear All Filters
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`grid gap-6 ${
                      viewMode === 'grid' 
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                        : 'grid-cols-1'
                    }`}
                    variants={staggerContainer}
                  >
                    {filtered.map((artist, index) => (
                      <motion.div
                        key={artist.id}
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: index * 0.05 }}
                      >
                        <ArtistCard artist={artist} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Load More / Pagination could go here */}
            {filtered.length > 0 && (
              <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Showing {filtered.length} of {artists.length} artists
                </p>
                {filtered.length < artists.length && (
                  <Button variant="outline" size="lg">
                    Load More Artists
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Featured Categories */}
        <motion.section 
          className="mt-16 py-12 bg-gradient-to-r from-gray-50 to-white dark:from-zinc-800 dark:to-zinc-700 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8 px-6">
            <h3 className="text-3xl font-bold mb-4">Popular Categories</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Explore artists by their specialties
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
            {categories.map((category, index) => {
              const categoryCount = artists.filter(a => a.category === category).length;
              return (
                <motion.button
                  key={category}
                  onClick={() => setFilters(prev => ({ ...prev, category }))}
                  className="p-4 text-center rounded-lg bg-white dark:bg-zinc-800 hover:shadow-lg transition-all hover:-translate-y-1 group"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    {categoryIcons[category as keyof typeof categoryIcons]}
                  </div>
                  <div className="font-semibold text-sm mb-1">{category}</div>
                  <div className="text-xs text-gray-500">{categoryCount} artists</div>
                </motion.button>
              );
            })}
          </div>
        </motion.section>
      </main>

      <Suspense fallback={<div className="text-center py-4"><Loader /></div>}>
        <Footer />
      </Suspense>
    </div>
  );
}