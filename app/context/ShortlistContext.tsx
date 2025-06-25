"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type ShortlistContextType = {
  shortlist: number[];
  addToShortlist: (id: number) => void;
  removeFromShortlist: (id: number) => void;
  isShortlisted: (id: number) => boolean;
};

const ShortlistContext = createContext<ShortlistContextType | undefined>(undefined);

export function ShortlistProvider({ children }: { children: ReactNode }) {
  const [shortlist, setShortlist] = useState<number[]>([]);

  const addToShortlist = (id: number) => {
    setShortlist((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };
  const removeFromShortlist = (id: number) => {
    setShortlist((prev) => prev.filter((item) => item !== id));
  };
  const isShortlisted = (id: number) => shortlist.includes(id);

  return (
    <ShortlistContext.Provider value={{ shortlist, addToShortlist, removeFromShortlist, isShortlisted }}>
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  const ctx = useContext(ShortlistContext);
  if (!ctx) throw new Error("useShortlist must be used within ShortlistProvider");
  return ctx;
} 