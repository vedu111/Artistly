"use client";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loader from "../../../components/Loader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { 
  MapPin, 
  DollarSign, 
  Languages, 
  Star, 
  Award, 
  ArrowLeft,
  Check,
  X,
  Heart,
  Share2,
  Mic,
  Palette,
  Music,
  Globe
} from "lucide-react";
import Image from "next/image";

const Footer = dynamic(() => import("../../../components/Footer"), { ssr: false });

interface Artist {
  id: number;
  name: string;
  category: string[] | string;
  location: string;
  feeRange: string;
  bio?: string;
  languages?: string[];
  image?: string;
}

export default function ArtistDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetch("/data/onboardArtists.json")
      .then(res => res.json())
      .then((data) => {
        const found = data.find((a: Artist) => a.id === Number(unwrappedParams.id));
        setArtist(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [unwrappedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Loader />
        </div>
        <Suspense fallback={<Loader />}>
          <Footer />
        </Suspense>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
        <Header />
        <div className="container mx-auto py-12 text-center">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-12 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Artist Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The artist you&apos;re looking for doesn&apos;t exist.</p>
            <Button onClick={() => router.push("/dashboard")} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
        <Suspense fallback={<Loader />}>
          <Footer />
        </Suspense>
      </div>
    );
  }

  const handleAction = (action: "accept" | "reject") => {
    // Add smooth animation before redirect
    const message = action === "accept" ? "Accepted" : "Rejected";
    alert(`${message} artist: ${artist.name}`);
    router.push("/dashboard");
  };

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'singer':
        return <Mic className="w-4 h-4" />;
      case 'dancer':
        return <Music className="w-4 h-4" />;
      case 'speaker':
        return <Mic className="w-4 h-4" />;
      default:
        return <Palette className="w-4 h-4" />;
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'singer':
        return 'from-pink-500 to-rose-500';
      case 'dancer':
        return 'from-purple-500 to-indigo-500';
      case 'speaker':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            onClick={() => router.push("/dashboard")} 
            variant="outline"
            className="group hover:shadow-md transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Dashboard
          </Button>
        </div>

        {/* Artist Profile Card */}
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden mb-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full translate-y-48 -translate-x-48"></div>
            
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Profile Image */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white dark:border-zinc-700 shadow-2xl group-hover:scale-105 transition-all duration-300">
                    <Image
                      src={artist.image || "/globe.svg"}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/globe.svg";
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-zinc-900 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Artist Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                      {artist.name}
                    </h1>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                    {(Array.isArray(artist.category) ? artist.category : [artist.category]).map((cat: string, index: number) => (
                      <span 
                        key={`${cat}-${index}`} 
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getCategoryGradient(cat)} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                      >
                        {getCategoryIcon(cat)}
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 max-w-2xl">
                    {artist.bio || "Passionate artist dedicated to creating memorable experiences through exceptional performances."}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-center md:justify-start">
                    <Button 
                      onClick={() => setIsLiked(!isLiked)}
                      variant="outline"
                      size="icon"
                      className="group hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-600 transition-all duration-300"
                    >
                      <Heart className={`w-4 h-4 transition-all duration-300 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-500 group-hover:text-red-500'}`} />
                    </Button>
                    
                    <Button 
                      variant="outline"
                      size="icon"
                      className="group hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                    >
                      <Share2 className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors duration-300" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Contact & Details Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Details</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                    <div className="font-medium text-gray-900 dark:text-white">{artist.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Fee Range</div>
                    <div className="font-medium text-gray-900 dark:text-white">{artist.feeRange}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Languages className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Languages</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {(Array.isArray(artist.languages) ? artist.languages : [artist.languages]).join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Performance Stats</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">150+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Performances</div>
                </div>
                
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">4.9</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                </div>
                
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">5+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Exp</div>
                </div>
                
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">98%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Artist Application Review
            </h3>
            
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => handleAction("accept")}
                className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Check className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Accept Artist
              </Button>
              
              <Button 
                onClick={() => handleAction("reject")}
                variant="destructive"
                className="group bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <X className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Reject Artist
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </div>
  );
}