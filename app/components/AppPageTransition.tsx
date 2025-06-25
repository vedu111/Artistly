"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function AppPageTransition({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={path}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}