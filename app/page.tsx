"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github } from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [showNavBanner, setShowNavBanner] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollRotation, setScrollRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;
      setIsScrolled(scrollY > heroHeight);

      const rotation = (scrollY * 0.05) % 360;
      setScrollRotation(rotation);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
        <div
          className="relative"
          onMouseEnter={() => setShowNavBanner(true)}
          onMouseLeave={() => setShowNavBanner(false)}
        >
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              showNavBanner
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="bg-black/90 backdrop-blur-sm rounded-full px-4 py-1 flex items-center gap-4">
              <button className="text-white hover:text-primary transition-colors text-sm font-medium">
                Earn
              </button>
              <button className="text-white hover:text-primary transition-colors text-sm font-medium">
                Blog
              </button>
              <div className="w-20 h-8" /> {/* Increased space for logo */}
              <button className="text-white hover:text-primary transition-colors text-sm font-medium">
                Docs
              </button>
              <button className="text-white hover:text-primary transition-colors text-sm font-medium">
                FAQ
              </button>
            </div>
          </div>

          <div className="relative z-10">
            <Image
              src="/whaling-logo.png"
              alt="Whaling Logo"
              width={112}
              height={112}
              className="w-28 h-28 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] filter contrast-110 cursor-pointer"
              priority
            />
          </div>
        </div>
      </div>

      <main className="min-h-screen relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/ocean-waves-bg.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="absolute top-6 right-6 z-20 flex items-center gap-4">
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
                "A unified dashboard for your liquidity across cosmos chains to navigate through vast data seas and discover hidden insights beneath the surface."
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
                transform: `translate(-50%, -50%) translateY(-${144}px) rotate(150deg)`,
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
                transform: `translate(-50%, -50%) translateY(-${240}px)`,
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
                src="/chains/neutron.svg"
                alt="Neutron"
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
              <div className="flex-1 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {"Powered by Mars Protocol"}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed mb-3">
                  {
                    "Advanced lending and borrowing capabilities integrated seamlessly into your Cosmos portfolio management experience."
                  }
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {
                    "Mars Protocol provides sophisticated DeFi tools that enhance your ability to maximize yield and manage risk across the Cosmos ecosystem."
                  }
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
              <div className="flex-1 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {"NFT Marketplace Integration"}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed mb-3">
                  {
                    "Comprehensive NFT portfolio tracking and marketplace integration through Stargaze, the premier NFT platform in the Cosmos ecosystem."
                  }
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {
                    "View, analyze, and manage your NFT collections across Cosmos chains with real-time valuation and marketplace activity insights."
                  }
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
              <div className="flex-1 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {"Lightning Fast Transactions"}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed mb-3">
                  {
                    "Superbolt provides lightning-fast transaction processing and advanced trading capabilities across the Cosmos ecosystem."
                  }
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {
                    "Experience ultra-low latency trading and seamless cross-chain operations with Superbolt's cutting-edge infrastructure."
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
              <div className="flex-1 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {"DeFi Lease Protocol"}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed mb-3">
                  {
                    "Nolus provides innovative DeFi lease solutions, enabling users to maximize their capital efficiency through advanced lending protocols."
                  }
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {
                    "Access sophisticated financial instruments and lease-based DeFi products built for the Cosmos ecosystem."
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-600 italic">
              {"And more to come..."}
            </h3>
          </div>
        </div>
      </section>

      <section className="relative -mt-16 z-0 w-screen ml-[calc(-50vw+50%)]">
        <div
          className="relative w-full h-[1344px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{
            backgroundImage: "url(/panorama.png)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto px-4">
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/app-views/overview.png"
                alt="Overview"
                width={800}
                height={600}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">Overview</h3>
                  <p className="text-sm text-gray-200">
                    Complete portfolio dashboard
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/app-views/staking.png"
                alt="Staking"
                width={800}
                height={600}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">Staking</h3>
                  <p className="text-sm text-gray-200">
                    Manage your staking rewards
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/app-views/defi.png"
                alt="DeFi"
                width={800}
                height={600}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">DeFi</h3>
                  <p className="text-sm text-gray-200">
                    DeFi protocols and liquidity
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/app-views/nft.png"
                alt="NFTs"
                width={800}
                height={600}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">NFTs</h3>
                  <p className="text-sm text-gray-200">
                    NFT collections and marketplace
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <p className="text-sm text-white font-bold drop-shadow-lg">
              © 2024 whalingdotxyz. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
