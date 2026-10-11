"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EcosystemConstellation } from "@/components/ecosystem-constellation";
import {
  ArrowLeftRight,
  Banknote,
  BookOpen,
  Coins,
  Github,
  MessageSquare,
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

function SocialLinks({ className }: { className: string }) {
  const linkClassName =
    "p-3 rounded-lg bg-gray-900/90 hover:bg-gray-800 text-white hover:text-primary transition-all duration-300";

  return (
    <div className={className}>
      <a
        href="https://docs.whaling.xyz"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Documentation"
        title="Documentation"
        className={linkClassName}
      >
        <BookOpen className="w-5 h-5" />
      </a>

      <a
        href="https://feedback.whaling.xyz"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Feedback"
        title="Feedback"
        className={linkClassName}
      >
        <MessageSquare className="w-5 h-5" />
      </a>

      <a
        href="https://github.com/whalingdotxyz"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        title="GitHub"
        className={linkClassName}
      >
        <Github className="w-5 h-5" />
      </a>

      <a
        href="https://x.com/whalingdotxyz"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X"
        title="X"
        className={linkClassName}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
    </div>
  );
}

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
        {/* Fade the bottom of the picture into the section below. */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas pointer-events-none" />

        <SocialLinks className="absolute top-6 right-6 z-20 hidden md:flex items-center gap-3" />

        {/* Anchored near the top so the text stays in the sky, above the wave horizon. */}
        <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 py-8 pt-[max(8rem,20svh)]">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 py-1.5 pl-2 pr-3 text-[12.5px] font-medium text-ink-muted backdrop-blur mb-6">
              <span className="size-1.5 rounded-full bg-brand" />
              {"Multi-chain portfolio tracker"}
            </div>

            <h1 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] mb-4 text-balance drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              <span className="text-ink">{"Dive deep into"}</span>
              <br />
              <span className="text-brand-gradient">{"whaleboard"}</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-ink mb-6 text-balance max-w-xs md:max-w-md mx-auto leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              {
                "A unified dashboard to help you steer your liquidity across the interchain."
              }
            </p>
          </div>

          <div className="w-full max-w-sm mx-auto rounded-card border border-line bg-surface/90 p-6 md:p-8 shadow-card backdrop-blur text-center space-y-5">
            <h2 className="text-lg md:text-xl font-semibold text-ink">
              {"Ready to Explore?"}
            </h2>

            <Button
              size="default"
              className="w-full h-11 rounded-[10px] bg-brand hover:bg-brand/90 text-ink-on-brand font-medium shadow-brand-glow transition-colors duration-300"
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

          <SocialLinks className="md:hidden flex items-center justify-center gap-3 mt-6 z-20" />

          <div className="mt-8" />
        </div>

        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent/40 rounded-full" />
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-primary/20 rounded-full" />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-accent/30 rounded-full" />
      </main>

      <section className="bg-canvas py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-ink text-center mb-12">
            {"Navigate the "}
            <span className="text-brand-gradient">{"Interchain"}</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] rounded-card border border-line bg-surface p-[22px] shadow-card"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center size-9 rounded-[10px] bg-brand/12 text-brand">
                    <feature.icon className="w-4 h-4" />
                  </div>
                  {feature.comingSoon && (
                    <span className="rounded-full bg-brand/12 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand">
                      {"Coming soon"}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
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
