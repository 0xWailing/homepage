"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github } from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [showNavBanner, setShowNavBanner] = useState(false);
  const [showBannerOnHover, setShowBannerOnHover] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollRotation, setScrollRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;
      setIsScrolled(scrollY > heroHeight);

      // Show banner when past the "Ready to Explore" section (roughly after hero + card)
      const readyToExploreThreshold = window.innerHeight * 0.9;
      const shouldShowOnScroll = scrollY > readyToExploreThreshold;
      setShowNavBanner(shouldShowOnScroll || showBannerOnHover);

      const rotation = (scrollY * 0.05) % 360;
      setScrollRotation(rotation);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showBannerOnHover]);

  // Update banner visibility when hover state changes
  useEffect(() => {
    const scrollY = window.scrollY;
    const readyToExploreThreshold = window.innerHeight * 0.9;
    const shouldShowOnScroll = scrollY > readyToExploreThreshold;
    setShowNavBanner(shouldShowOnScroll || showBannerOnHover);
  }, [showBannerOnHover]);

  const handleLogoClick = () => {
    // Only enable click toggle on mobile (screens smaller than md breakpoint)
    if (window.innerWidth < 768) {
      const scrollY = window.scrollY;
      const readyToExploreThreshold = window.innerHeight * 0.9;
      const shouldShowOnScroll = scrollY > readyToExploreThreshold;

      // Toggle banner only if not showing due to scroll
      if (!shouldShowOnScroll) {
        setShowBannerOnHover(!showBannerOnHover);
      }
    }
  };

  return (
    <>
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-30">
        <div
          className="relative"
          onMouseEnter={() => setShowBannerOnHover(true)}
          onMouseLeave={() => setShowBannerOnHover(false)}
        >
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              showNavBanner
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="bg-black/90 backdrop-blur-sm rounded-full px-4 sm:px-10 py-1 flex items-center justify-between w-80 sm:w-[28rem]">
              <div className="flex-1 flex justify-center">
                <button
                  className="text-white hover:text-primary transition-colors text-xs sm:text-sm font-medium text-center"
                  onClick={() =>
                    window.open("https://beta.whaling.xyz", "_blank")
                  }
                >
                  App (Launch Beta)
                </button>
              </div>
              <div className="w-16 sm:w-24 h-6" />{" "}
              {/* Smaller space for logo */}
              <div className="flex-1 flex justify-center">
                <button className="text-white hover:text-primary transition-colors text-xs sm:text-sm font-medium text-center">
                  Docs (coming soon)
                </button>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <Image
              src={
                showNavBanner
                  ? "/logos/whaling_dark.png"
                  : "/logos/whaling_logo.png"
              }
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
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              <span className="text-white">{"Dive deep into"}</span>
              <br />
              <span className="text-white">{"whaleboard"}</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-white mb-6 text-pretty max-w-2xl mx-auto leading-relaxed">
              {
                "A unified dashboard to help you steer your liquidity across cosmos chains and apps."
              }
            </p>
          </div>

          <Card className="p-6 md:p-8 bg-card/95 border-primary/20 shadow-2xl max-w-sm w-full mx-auto">
            <div className="text-center space-y-6">
              <h2 className="text-xl md:text-2xl font-semibold text-card-foreground">
                {"Ready to Explore?"}
              </h2>

              <p className="text-sm text-muted-foreground text-balance">
                {
                  "Check out the beta version that serves as a proof of concept with working assets overviews and protocols integrations."
                }
              </p>

              <Button
                size="default"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
                asChild
              >
                <a
                  href="https://beta.whaling.xyz"
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {"Navigate the Interchain"}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">
                {"Unified Assets Management"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {
                  "Track and manage your assets across multiple Cosmos chains from a single, intuitive dashboard. No more jumping between different interfaces."
                }
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">
                {"Defi & NFTs"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {
                  "centralized overview of your liquity across various protocols with critical data at a glance helping you make informed decisions in the DeFi space."
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4 border-t border-gray-200 relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 flex items-center justify-center opacity-40 blur-[1px]">
          <div className="w-48 h-48 border border-gray-300 rounded-full absolute"></div>
          <div className="w-72 h-72 border border-gray-300 rounded-full absolute"></div>
          <div className="w-96 h-96 border border-gray-300 rounded-full absolute"></div>
          <div className="w-[30rem] h-[30rem] border border-gray-300 rounded-full absolute"></div>
          <div className="w-[36rem] h-[36rem] border border-gray-300 rounded-full absolute"></div>
          <div className="w-[42rem] h-[42rem] border border-gray-300 rounded-full absolute"></div>
          <div className="w-[48rem] h-[48rem] border border-gray-300 rounded-full absolute"></div>
          <div className="w-[54rem] h-[54rem] border border-gray-300 rounded-full absolute"></div>

          <div
            className="absolute w-48 h-48"
            style={{ transform: `rotate(${scrollRotation + 85}deg)` }}
          >
            <div
              className="absolute hover:scale-125 transition-transform duration-300"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translateY(-${96}px)`,
              }}
            >
              <Image
                src="/chains/atom.svg"
                alt="Cosmos Hub"
                width={40}
                height={40}
                className="w-10 h-10 drop-shadow-lg"
              />
            </div>
          </div>

          <div
            className="absolute w-72 h-72"
            style={{ transform: `rotate(${scrollRotation * 0.9 + 160}deg)` }}
          >
            <div
              className="absolute hover:scale-125 transition-transform duration-300"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translateY(-${144}px) rotate(149deg)`,
              }}
            >
              <Image
                src="/chains/neutron.svg"
                alt="Neutron"
                width={40}
                height={40}
                className="w-10 h-10 drop-shadow-lg"
              />
            </div>
          </div>

          <div
            className="absolute w-96 h-96"
            style={{ transform: `rotate(${scrollRotation * 0.8 + 310}deg)` }}
          >
            <div
              className="absolute hover:scale-125 transition-transform duration-300"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translateY(-${192}px) rotate(7deg)`,
              }}
            >
              <Image
                src="/chains/dydx.svg"
                alt="dYdX"
                width={40}
                height={40}
                className="w-10 h-10 drop-shadow-lg"
              />
            </div>
          </div>

          <div
            className="absolute w-[30rem] h-[30rem]"
            style={{ transform: `rotate(${scrollRotation * 0.7 + 25}deg)` }}
          >
            <div
              className="absolute hover:scale-125 transition-transform duration-300"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translateY(-${240}px)rotate(280deg)`,
              }}
            >
              <Image
                src="/chains/osmo.svg"
                alt="Osmosis"
                width={40}
                height={40}
                className="w-10 h-10 drop-shadow-lg"
              />
            </div>
          </div>

          <div
            className="absolute w-[36rem] h-[36rem]"
            style={{ transform: `rotate(${scrollRotation * 0.6 + 220}deg)` }}
          >
            <div
              className="absolute hover:scale-125 transition-transform duration-300"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translateY(-${288}px) rotate(110deg)`,
              }}
            >
              <Image
                src="/chains/noble.svg"
                alt="Noble"
                width={40}
                height={40}
                className="w-10 h-10 drop-shadow-lg"
              />
            </div>
          </div>

          <div
            className="absolute w-[42rem] h-[42rem]"
            style={{ transform: `rotate(${scrollRotation * 0.5 + 155}deg)` }}
          >
            <div
              className="absolute hover:scale-125 transition-transform duration-300"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translateY(-${336}px) rotate(177deg)`,
              }}
            >
              <Image
                src="/chains/akt.svg"
                alt="Akash"
                width={40}
                height={40}
                className="w-10 h-10 drop-shadow-lg"
              />
            </div>
          </div>

          <div
            className="absolute w-[48rem] h-[48rem]"
            style={{ transform: `rotate(${scrollRotation * 0.4 + 280}deg)` }}
          >
            <div
              className="absolute hover:scale-125 transition-transform duration-300"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translateY(-${384}px)`,
              }}
            >
              <Image
                src="/chains/celestia.svg"
                alt="Celestia"
                width={40}
                height={40}
                className="w-10 h-10 drop-shadow-lg"
              />
            </div>
          </div>

          <div
            className="absolute w-[54rem] h-[54rem]"
            style={{ transform: `rotate(${scrollRotation * 0.3 + 70}deg)` }}
          >
            <div
              className="absolute hover:scale-125 transition-transform duration-300"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translateY(-${432}px) rotate(5deg)`,
              }}
            >
              <Image
                src="/chains/baby.svg"
                alt="Baby"
                width={40}
                height={40}
                className="w-10 h-10 drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none -mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {"Supported Chains"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
            {
              "Navigate through all flagship cosmos chains with integrated chain support"
            }
          </p>
        </div>
      </section>

      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {"Integrated Protocols"}
            </h2>
          </div>
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <a
                  href="https://marsprotocol.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-64 h-32 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #440B37, black)",
                  }}
                >
                  <Image
                    src="/protocols/mars_protocol.svg"
                    alt="Mars Protocol"
                    width={140}
                    height={56}
                    className="drop-shadow-lg"
                  />
                </a>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {"Mars Protocol"}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed mb-3">
                  {"Your ultimate destination for leveraged yield."}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <a
                  href="https://stargaze.zone/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-64 h-32 bg-black rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  <Image
                    src="/protocols/stargaze_logo.svg"
                    alt="Stargaze"
                    width={120}
                    height={24}
                    className="drop-shadow-lg"
                  />
                </a>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {"Stargaze"}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed mb-3">
                  {"The interchain NFTs marketplace."}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <a
                  href="https://superbolt.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-64 h-32 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  style={{ backgroundColor: "#3FFFF3" }}
                >
                  <Image
                    src="/protocols/superbolt_logo.svg"
                    alt="Superbolt"
                    width={140}
                    height={28}
                    className="drop-shadow-lg"
                  />
                </a>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {"Superbolt"}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed mb-3">
                  {
                    "Where NFTs meet DeFi - mint, trade and fractionalize your NFTs!"
                  }
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <a
                  href="https://nolus.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-64 h-32 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  style={{ backgroundColor: "#E8EAF1" }}
                >
                  <Image
                    src="/protocols/nolus_logo.svg"
                    alt="Nolus"
                    width={120}
                    height={24}
                    className="drop-shadow-lg"
                  />
                </a>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {"Nolus (coming soon)"}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed mb-3">
                  {
                    "Supercharge your buying power with asset-backed leverage, fixed rates, and reduced margin call risk."
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl md:text-3xl font-semibold text-shadow-black">
              {"And more to come..."}
            </h3>
          </div>
        </div>
      </section>

      <section className="relative z-0 w-screen ml-[calc(-50vw+50%)]">
        {/* Background with fade */}
        <div
          className="absolute inset-0 w-full min-h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/background/panorama.png)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.01) 2%, rgba(0,0,0,0.03) 4%, rgba(0,0,0,0.06) 6%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.22) 12%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.4) 18%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.6) 22%, rgba(0,0,0,0.7) 24%, rgba(0,0,0,0.8) 26%, rgba(0,0,0,0.9) 28%, rgba(0,0,0,1) 30%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.01) 2%, rgba(0,0,0,0.03) 4%, rgba(0,0,0,0.06) 6%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.22) 12%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.4) 18%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.6) 22%, rgba(0,0,0,0.7) 24%, rgba(0,0,0,0.8) 26%, rgba(0,0,0,0.9) 28%, rgba(0,0,0,1) 30%)",
          }}
        ></div>

        {/* Content on top - unaffected by fade */}
        <div className="relative w-full flex flex-col z-10 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="group relative overflow-hidden rounded-lg sm:rounded-xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/app-views/overview.png"
                alt="Overview"
                width={800}
                height={600}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
                  <h3 className="text-lg sm:text-xl font-semibold">Overview</h3>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg sm:rounded-xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/app-views/staking.png"
                alt="Staking"
                width={800}
                height={600}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
                  <h3 className="text-lg sm:text-xl font-semibold">Staking</h3>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg sm:rounded-xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/app-views/defi.png"
                alt="DeFi"
                width={800}
                height={600}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
                  <h3 className="text-lg sm:text-xl font-semibold">DeFi</h3>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg sm:rounded-xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/app-views/nft.png"
                alt="NFTs"
                width={800}
                height={600}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
                  <h3 className="text-lg sm:text-xl font-semibold">NFTs</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright positioned below images but still on panorama */}
          <div className="mt-12 sm:mt-16 md:mt-24 pt-8 sm:pt-12 pb-2 sm:pb-2">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-xs sm:text-sm text-white font-bold drop-shadow-lg">
                © 2024 whalingdotxyz. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
