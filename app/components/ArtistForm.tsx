"use client";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  User,
  FileText,
  Music,
  Languages,
  DollarSign,
  MapPin,
  Upload,
  X,
  Check,
  Star,
  Camera,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Award,
  Users,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "Singer", label: "Singer", icon: <Music className="w-4 h-4" />, color: "from-pink-500 to-rose-500" },
  { id: "Dancer", label: "Dancer", icon: <Users className="w-4 h-4" />, color: "from-purple-500 to-violet-500" },
  { id: "Speaker", label: "Speaker", icon: <User className="w-4 h-4" />, color: "from-green-500 to-emerald-500" },
  { id: "DJ", label: "DJ", icon: <Music className="w-4 h-4" />, color: "from-blue-500 to-cyan-500" }
];

const languages = [
  { id: "English", label: "English", flag: "🇺🇸" },
  { id: "Hindi", label: "Hindi", flag: "🇮🇳" },
  { id: "Marathi", label: "Marathi", flag: "🇮🇳" },
  { id: "Gujarati", label: "Gujarati", flag: "🇮🇳" }
];

const feeRanges = [
  { id: "$100-$500", label: "$100 - $500", description: "Great for small events" },
  { id: "$500-$1000", label: "$500 - $1,000", description: "Perfect for medium events" },
  { id: "$1000-$5000", label: "$1,000 - $5,000", description: "Ideal for large events" },
  { id: "$5000+", label: "$5,000+", description: "Premium performances" }
];

const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  bio: yup.string().required("Bio is required").min(50, "Bio must be at least 50 characters"),
  category: yup.array().min(1, "Select at least one category"),
  languages: yup.array().min(1, "Select at least one language"),
  feeRange: yup.string().required("Fee range is required"),
  location: yup.string().required("Location is required"),
  image: yup.mixed().notRequired(),
});

const steps = [
  { id: 1, title: "Personal Info & Photo", icon: <User className="w-5 h-5" /> },
  { id: 2, title: "Skills & Expertise", icon: <Star className="w-5 h-5" /> },
  { id: 3, title: "Pricing & Location", icon: <DollarSign className="w-5 h-5" /> }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export default function ArtistForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      bio: "",
      category: [],
      languages: [],
      feeRange: "",
      location: "",
      image: null,
    },
  });

  const watchedFields = watch();
  const progress = Math.round((currentStep / steps.length) * 100);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Artist Submission:", data);
    alert("🎉 Welcome to Artistly! Your profile has been submitted successfully.");
    reset();
    setImagePreview(null);
    setCurrentStep(1);
    setIsSubmitting(false);
    window.location.href = "/";
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setValue("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step) => {
    switch (step) {
      case 1: return ["name", "bio", "image"];
      case 2: return ["category", "languages"];
      case 3: return ["feeRange", "location"];
      default: return [];
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div className="space-y-6" {...fadeInUp}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Tell us about yourself</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Let's start with your basic information and photo
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-2 flex items-center">
                <User className="w-4 h-4 mr-2 text-primary" />
                Full Name *
              </label>
              <Input
                {...register("name")}
                placeholder="Enter your full name"
                className="text-lg py-3"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <X className="w-4 h-4 mr-1" />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-primary" />
                Professional Bio *
              </label>
              <Textarea
                {...register("bio")}
                placeholder="Tell us about your experience, achievements, and what makes you unique as a performer..."
                rows={4}
                className="text-lg"
              />
              <div className="flex justify-between items-center mt-1">
                {errors.bio ? (
                  <p className="text-red-500 text-sm flex items-center">
                    <X className="w-4 h-4 mr-1" />
                    {errors.bio.message}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm">
                    {watchedFields.bio?.length || 0} characters (minimum 50)
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-4 flex items-center">
                <Camera className="w-4 h-4 mr-2 text-primary" />
                Profile Picture (Optional)
              </label>
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setValue("image", null);
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 dark:border-zinc-600 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Photo
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div className="space-y-6" {...fadeInUp}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Your Skills & Expertise</h3>
              <p className="text-gray-600 dark:text-gray-300">
                What type of performances do you specialize in?
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-4 flex items-center">
                <Music className="w-4 h-4 mr-2 text-primary" />
                Performance Categories *
              </label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <motion.div
                        key={cat.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          field.value.includes(cat.id)
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 dark:border-zinc-700 hover:border-primary/50'
                        }`}>
                          <input
                            type="checkbox"
                            value={cat.id}
                            checked={field.value.includes(cat.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange([...field.value, cat.id]);
                              } else {
                                field.onChange(field.value.filter((v) => v !== cat.id));
                              }
                            }}
                            className="sr-only"
                          />
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${cat.color} flex items-center justify-center text-white mr-3`}>
                            {cat.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{cat.label}</div>
                          </div>
                          {field.value.includes(cat.id) && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </label>
                      </motion.div>
                    ))}
                  </div>
                )}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <X className="w-4 h-4 mr-1" />
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-4 flex items-center">
                <Languages className="w-4 h-4 mr-2 text-primary" />
                Languages You Perform In *
              </label>
              <Controller
                control={control}
                name="languages"
                render={({ field }) => (
                  <div className="flex flex-wrap gap-3">
                    {languages.map((lang) => (
                      <motion.div
                        key={lang.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <label className={`flex items-center px-4 py-2 rounded-full border-2 cursor-pointer transition-all ${
                          field.value.includes(lang.id)
                            ? 'border-primary bg-primary/5 dark:bg-zinc-900 dark:border-primary'
                            : 'border-gray-200 dark:border-zinc-700 hover:border-primary/50'
                        } dark:text-zinc-100`}>
                          <input
                            type="checkbox"
                            value={lang.id}
                            checked={field.value.includes(lang.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange([...field.value, lang.id]);
                              } else {
                                field.onChange(field.value.filter((v) => v !== lang.id));
                              }
                            }}
                            className="sr-only"
                          />
                          <span className="mr-2">{lang.flag}</span>
                          <span className="font-medium">{lang.label}</span>
                          {field.value.includes(lang.id) && (
                            <Check className="w-4 h-4 ml-2" />
                          )}
                        </label>
                      </motion.div>
                    ))}
                  </div>
                )}
              />
              {errors.languages && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <X className="w-4 h-4 mr-1" />
                  {errors.languages.message}
                </p>
              )}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div className="space-y-6" {...fadeInUp}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Pricing & Location</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Help clients understand your rates and availability
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-4 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-primary" />
                Performance Fee Range *
              </label>
              <div className="space-y-3">
                {feeRanges.map((fee) => (
                  <motion.label
                    key={fee.id}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      watchedFields.feeRange === fee.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 dark:border-zinc-700 hover:border-primary/50'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <input
                      {...register("feeRange")}
                      type="radio"
                      value={fee.id}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-4 flex items-center justify-center ${
                      watchedFields.feeRange === fee.id
                        ? 'border-primary bg-primary'
                        : 'border-gray-300'
                    }`}>
                      {watchedFields.feeRange === fee.id && (
                        <Check className="w-2 h-2 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{fee.label}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{fee.description}</div>
                    </div>
                  </motion.label>
                ))}
              </div>
              {errors.feeRange && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <X className="w-4 h-4 mr-1" />
                  {errors.feeRange.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                Location *
              </label>
              <Input
                {...register("location")}
                placeholder="City, State (e.g., Mumbai, Maharashtra)"
                className="text-lg py-3 bg-white border-gray-300 text-gray-900 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <X className="w-4 h-4 mr-1" />
                  {errors.location.message}
                </p>
              )}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-800 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Join Artistly
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Start your journey as a verified performer and connect with event organizers worldwide
          </p>
        </motion.div>

        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  currentStep > step.id
                    ? 'bg-green-500 border-green-500 text-white'
                    : currentStep === step.id
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 dark:border-zinc-600 text-gray-400'
                }`}>
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-20 h-1 mx-2 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-200 dark:bg-zinc-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-1">
              Step {currentStep}: {steps[currentStep - 1]?.title}
            </h2>
            <Progress value={progress} className="w-full max-w-md mx-auto" />
            <p className="text-sm text-gray-500 mt-2">{progress}% Complete</p>
          </div>
        </motion.div>

        <Card className="max-w-2xl mx-auto p-8 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-zinc-700">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="flex items-center px-8"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4 mr-2" />
                      Join Artistly
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Card>

        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {[
            {
              icon: <Users className="w-6 h-6 text-blue-500" />,
              title: "Connect with Clients",
              description: "Get discovered by event organizers looking for your talents"
            },
            {
              icon: <Clock className="w-6 h-6 text-green-500" />,
              title: "Flexible Scheduling",
              description: "Work on your terms and manage your own availability"
            },
            {
              icon: <Award className="w-6 h-6 text-purple-500" />,
              title: "Build Your Brand",
              description: "Showcase your skills and build a professional reputation"
            }
          ].map((benefit, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
}