"use client"

import React from "react"
import { Inter } from "next/font/google"
import LandingBackground from "./LandingBackground"
import HeroSection from "./HeroSection"
import StatsSection from "./StatsSection"
import FeaturesSection from "./FeaturesSection"
import TestimonialsSection from "./TestimonialsSection"
import CtaSection from "./CtaSection"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
})

export default function LandingPage() {
  return (
    <div className={inter.className}>
      <LandingBackground />

      <div className="pt-16">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </div>
    </div>
  )
}
