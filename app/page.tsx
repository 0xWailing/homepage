"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EcosystemConstellation } from "@/components/ecosystem-constellation";
import {
  ArrowLeftRight,
  Banknote,
  Coins,
  Github,
  Sparkles,
  Wallet,
} from "lucide-react";

const FEATURES = [
  {
    icon: Wallet,
    title: "View Positions",
    description:
      "See every token, liquidity and lending position across your chains in one place.",
  },
  {
    icon: Coins,
    title: "Stake Management",
    description:
      "Track your delegations and rewards, and manage your staking across networks from a single view.",
  },
  {
    icon: Sparkles,
    title: "DeFi Protocols Highlight",
    description:
      "Discover leading protocols and opportunities, with the key data at a glance to make informed decisions.",
  },
  {
    icon: ArrowLeftRight,
    title: "Swap Across Chains",
    description:
      "Move assets between chains in a few clicks, without leaving the dashboard.",
    comingSoon: true,
  },
  {
    icon: Banknote,
    title: "On/Off Ramp",
    description: "Go from fiat to crypto and back, straight from whaleboard.",
    comingSoon: true,
  },
];

export default function HomePage() {
  const handleLogoClick = () => {
    window.open("https://app.whaling.xyz", "_blank");
  };

  return (
    <>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
        <div className="relative">
          <div className="relative z-10">
            <Image
              src="/logos/whaling_logo.png"
              alt="Whaling Logo"
              width={112}
              height={112}
              className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] filter contrast-110 cursor-pointer transition-all duration-300 subpixel-antialiased rounded-full bg-transparent"
              style={{
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
                WebkitTransform: "translateZ(0)",
                transform: "translateZ(0)",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
              onClick={handleLogoClick}
              priority
            />
          </div>
        </div>
      </div>

      <main className="min-h-screen relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/background/ocean-waves-bg.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="absolute top-6 right-6 z-20 hidden md:flex items-center gap-4">
          <a
            href="https://github.com/whalingdotxyz"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-gray-900/90 hover:bg-gray-800 text-white hover:text-primary transition-all duration-300"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href="https://x.com/whalingdotxyz"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-gray-900/90 hover:bg-gray-800 text-white hover:text-primary transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 pt-32">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              <span className="text-white">{"Dive deep into"}</span>
              <br />
              <span className="text-white">{"whaleboard"}</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-white mb-6 text-balance max-w-xs md:max-w-md mx-auto leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              {
                "A unified dashboard to help you steer your liquidity across the interchain."
              }
            </p>
          </div>

          <Card className="p-6 md:p-8 bg-card/95 border-primary/20 shadow-2xl max-w-sm w-full mx-auto">
            <div className="text-center space-y-6">
              <h2 className="text-xl md:text-2xl font-semibold text-card-foreground">
                {"Ready to Explore?"}
              </h2>



              <Button
                size="default"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
                asChild
              >
                <a
                  href="https://app.whaling.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {"Start Your Journey"}
                </a>
              </Button>
            </div>
          </Card>

          {/* Mobile social buttons - shown only on mobile */}
          <div className="md:hidden flex items-center justify-center gap-4 mt-6 z-20">
            <a
              href="https://github.com/whalingdotxyz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-gray-900/90 hover:bg-gray-800 text-white hover:text-primary transition-all duration-300"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href="https://x.com/whalingdotxyz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-gray-900/90 hover:bg-gray-800 text-white hover:text-primary transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          <div className="mt-8" />
        </div>

        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent/40 rounded-full" />
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-primary/20 rounded-full" />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-accent/30 rounded-full" />
      </main>

      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            {"Navigate the Interchain"}
          </h2>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-12">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] flex flex-col items-center space-y-4"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-primary">
                  {feature.title}
                </h3>
                {feature.comingSoon && (
                  <span className="-mt-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {"Coming soon"}
                  </span>
                )}
                <p className="text-gray-600 leading-relaxed max-w-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EcosystemConstellation />
    </>
  );
}
