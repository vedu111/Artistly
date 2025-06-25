'use client';

import Header from "../components/Header";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loader from "../components/Loader";
import Table from "../components/Table";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Filter,
  Search,
  Plus,
  Star,
  Award,
  Activity
} from "lucide-react";

const Footer = dynamic(() => import("../components/Footer"), { ssr: false });

// Define Artist type
interface Artist {
  id: number;
  name: string;
  category: string[];
  location: string;
  feeRange: string;
  bio: string;
  languages: string[];
  image: string;
}

// StatCard props type
interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle?: string;
  gradient: string;
}

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Category", accessor: "category" },
  { header: "City", accessor: "location" },
  { header: "Fee", accessor: "feeRange" },
];

export default function DashboardPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  useEffect(() => {
    fetch("/data/onboardArtists.json")
      .then(res => res.json())
      .then((data: Artist[]) => {
        setArtists(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAction = (row: Artist) => {
    router.push(`/dashboard/artist/${row.id}`);
  };

  // Calculate stats
  const totalArtists = artists.length;
  const categories = [...new Set(artists.map(artist => artist.category).filter(Boolean))];
  const cities = [...new Set(artists.map(artist => artist.location).filter(Boolean))];
  const avgFee = artists.length > 0 ?
    artists.reduce((sum, artist) => {
      const feeString = String(artist.feeRange || '');
      // Extract all numbers from the string
      const matches = feeString.match(/\d+/g);
      if (matches && matches.length >= 2) {
        // Average the two numbers
        const min = parseInt(matches[0], 10);
        const max = parseInt(matches[1], 10);
        return sum + (min + max) / 2;
      } else if (matches && matches.length === 1) {
        return sum + parseInt(matches[0], 10);
      }
      return sum;
    }, 0) / artists.length : 0;

  // Filter artists
  const filteredArtists = artists.filter((artist: Artist) => {
    // Safe string conversion with null checks
    const name = String(artist.name || '').toLowerCase();
    const category = Array.isArray(artist.category) ? artist.category.join(', ').toLowerCase() : String(artist.category || '').toLowerCase();
    const location = String(artist.location || '').toLowerCase();
    const search = searchTerm.toLowerCase();
    
    // Search filter - matches if search term is found in name, category, or location
    const matchesSearch = search === '' || 
                         name.includes(search) ||
                         category.includes(search) ||
                         location.includes(search);
    
    // Category filter - matches if "all" is selected OR if artist's category matches selected category
    const matchesCategory = selectedCategory === "all" || 
      (Array.isArray(artist.category) ? artist.category.includes(selectedCategory) : String(artist.category || '') === selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  const StatCard = ({ icon: Icon, title, value, subtitle, gradient }: StatCardProps) => (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-20 w-20 rounded-full bg-white/10"></div>
      <div className="absolute bottom-0 left-0 -mb-6 -ml-6 h-24 w-24 rounded-full bg-white/5"></div>
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            {subtitle && <p className="text-white/70 text-xs mt-1">{subtitle}</p>}
          </div>
          <div className="p-3 bg-white/20 rounded-full">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900 dark:text-zinc-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="h-4 w-4" />
            Manager Dashboard
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent dark:from-white dark:via-zinc-200 dark:to-zinc-400 mb-4">
            Artist Management Hub
          </h1>
          <p className="text-gray-600 dark:text-zinc-300 text-lg max-w-2xl mx-auto">
            Manage your roster of talented artists, track performance metrics, and grow your entertainment business
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader />
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={Users}
                title="Total Artists"
                value={totalArtists}
                subtitle="Active performers"
                gradient="from-blue-500 to-blue-600"
              />
              <StatCard
                icon={Activity}
                title="Categories"
                value={categories.length}
                subtitle="Performance types"
                gradient="from-indigo-500 to-indigo-600"
              />
              <StatCard
                icon={MapPin}
                title="Cities"
                value={cities.length}
                subtitle="Geographic reach"
                gradient="from-purple-500 to-purple-600"
              />
              <StatCard
                icon={DollarSign}
                title="Avg Fee"
                value={`$${Math.round(avgFee).toLocaleString()}`}
                subtitle="Per performance"
                gradient="from-green-500 to-green-600"
              />
            </div>

            {/* Action Bar */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search artists, categories, cities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100"
                    />
                  </div>
                  
                  {/* Category Filter */}
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="pl-10 pr-8 py-2.5 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 min-w-[160px]"
                    >
                      <option value="all">All Categories</option>
                      {categories.map((category, index) => (
                        <option key={`${category}-${index}`} value={category} className="bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100">
                          {category || 'Uncategorized'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Add Artist Button */}
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                  <Plus className="h-4 w-4" />
                  Add New Artist
                </button>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 p-4 mb-8">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-zinc-300">Showing {filteredArtists.length} of {totalArtists} artists</span>
                  </div>
                  {searchTerm && (
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-gray-400 dark:text-zinc-500" />
                      <span className="text-gray-600 dark:text-zinc-300">Search: &quot;{searchTerm}&quot;</span>
                    </div>
                  )}
                  {selectedCategory !== "all" && (
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-gray-400 dark:text-zinc-500" />
                      <span className="text-gray-600 dark:text-zinc-300">Category: {selectedCategory}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 text-gray-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 dark:text-zinc-400" />
                    <span>Premium Artists: {Math.floor(totalArtists * 0.3)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 dark:text-zinc-400" />
                    <span>Active This Month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Artists Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-zinc-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Artist Roster</h2>
                    <p className="text-gray-600 dark:text-zinc-400 text-sm">Manage and view all your artists</p>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <Table
                  columns={columns}
                  data={filteredArtists}
                  onAction={handleAction}
                  actionLabel="View Profile"
                />
              </div>
            </div>

            {/* Empty State */}
            {filteredArtists.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No artists found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? `No artists match "${searchTerm}"` : 'Start by adding your first artist to the roster'}
                </p>
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                  <Plus className="h-4 w-4" />
                  Add Your First Artist
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </div>
  );
}