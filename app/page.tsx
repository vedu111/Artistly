"use client";
import Header from "./components/Header";
import dynamic from "next/dynamic";
import CategoryCard from "./components/CategoryCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Music, 
  Mic, 
  Speaker, 
  Disc, 
  Star, 
  Users, 
  Calendar,
  CheckCircle,
  PlayCircle,
  Heart,
  Award,
  Zap,
  Globe,
  Clock,
  ArrowRight,
  Quote
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Footer = dynamic(() => import("./components/Footer"), { ssr: false });

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Event Coordinator",
    company: "Dream Events",
    content: "Artistly made booking performers for our corporate event seamless. The quality of artists exceeded our expectations!",
    rating: 5
  },
  {
    name: "Mike Chen",
    role: "Wedding Planner",
    company: "Perfect Moments",
    content: "Found the perfect jazz trio for our client's wedding. The booking process was incredibly smooth and professional.",
    rating: 5
  },
  {
    name: "Lisa Rodriguez",
    role: "Festival Director",
    company: "Summer Beats",
    content: "We've booked over 50 artists through Artistly. Their platform is reliable and their artist quality is top-notch.",
    rating: 5
  }
];

const stats = [
  { number: "5000+", label: "Verified Artists", icon: <Users className="w-5 h-5" /> },
  { number: "25K+", label: "Events Booked", icon: <Calendar className="w-5 h-5" /> },
  { number: "98%", label: "Client Satisfaction", icon: <Star className="w-5 h-5" /> },
  { number: "50+", label: "Cities Covered", icon: <Globe className="w-5 h-5" /> }
];

const features = [
  {
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    title: "Verified Artists",
    description: "All performers are professionally vetted and background-checked"
  },
  {
    icon: <Clock className="w-6 h-6 text-blue-500" />,
    title: "Quick Booking",
    description: "Book and confirm artists in under 24 hours"
  },
  {
    icon: <Award className="w-6 h-6 text-purple-500" />,
    title: "Quality Guarantee",
    description: "100% satisfaction guarantee or we'll find you a replacement"
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    title: "Instant Quotes",
    description: "Get pricing and availability in real-time"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-800">
      <Header />
      
      {/* Enhanced Hero Section */}
      <motion.section 
        className="relative overflow-hidden"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20" />
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
                <Star className="w-4 h-4 mr-2" />
                #1 Artist Booking Platform
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Book World-Class Artists for Your Next Event
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Connect with thousands of verified performers including singers, dancers, speakers, and DJs. 
              From intimate gatherings to grand celebrations, find the perfect artist to make your event unforgettable.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeInUp}
            >
              <Link href="/artists">
                <Button size="lg" className="px-8 py-4 text-lg font-semibold group">
                  Explore Artists
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold group">
                <PlayCircle className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced Category Cards */}
      <motion.section 
        className="container mx-auto px-4 py-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl font-bold mb-4">Discover Artists by Category</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse our curated selection of professional performers across all genres and styles
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
        >
          {[
            {
              icon: <Music className="w-8 h-8" />,
              title: "Singers",
              description: "From pop to classical, find vocalists for every event.",
              count: "1,200+ artists",
              color: "from-pink-500 to-rose-500"
            },
            {
              icon: <Disc className="w-8 h-8" />,
              title: "DJs",
              description: "Party-starters and crowd-pleasers for any vibe.",
              count: "800+ artists",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: <Mic className="w-8 h-8" />,
              title: "Speakers",
              description: "Motivational, keynote, and event speakers.",
              count: "500+ artists",
              color: "from-green-500 to-emerald-500"
            },
            {
              icon: <Speaker className="w-8 h-8" />,
              title: "Dancers",
              description: "Soloists, troupes, and cultural performers.",
              count: "600+ artists",
              color: "from-purple-500 to-violet-500"
            }
          ].map((category, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0 bg-white dark:bg-zinc-800">
                <div className={`h-2 bg-gradient-to-r ${category.color}`} />
                <div className="p-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{category.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-gray-50 to-white dark:from-zinc-800 dark:to-zinc-900"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold mb-4">Why Choose Artistly?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We make booking artists simple, safe, and stress-free with our comprehensive platform
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-lg hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                variants={fadeInUp}
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="py-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Trusted by event planners and organizations worldwide
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-primary mr-3" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Artist CTA Section */}
      <motion.section 
        className="py-10 bg-white dark:bg-zinc-900"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-gray-50 to-white dark:from-zinc-800 dark:to-zinc-700 rounded-2xl p-12 shadow-lg"
            variants={fadeInUp}
          >
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">Are You an Artist?</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our platform and connect with event planners looking for talented performers like you. 
              Start getting booked for amazing events today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/onboard">
                <Button size="lg" className="px-8 py-4 text-lg font-semibold">
                  Get Started Today
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Suspense fallback={<div className="text-center py-4 text-gray-400">Loading footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}