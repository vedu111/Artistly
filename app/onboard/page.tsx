"use client";
import Header from "../components/Header";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loader from "../components/Loader";
import ArtistForm from "../components/ArtistForm";

const Footer = dynamic(() => import("../components/Footer"), { ssr: false });

export default function OnboardPage() {
  return (
    <div>
      <Header />
      <ArtistForm />
      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </div>
  );
}