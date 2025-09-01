"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github } from "lucide-react"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [showNavBanner, setShowNavBanner] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollRotation, setScrollRotation] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight * 0.8
      setIsScrolled(scrollY > heroHeight)

      const rotation = (scrollY * 0.05) % 360
      setScrollRotation(rotation)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-30">
        <div
          className="relative"
          onMouseEnter={() => setShowNavBanner(true)}
          onMouseLeave={() => setShowNavBanner(false)}
        >
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              showNavBanner || isScrolled ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="bg-black/90 backdrop-blur-sm rounded-full px-4 py-1 flex items-center gap-4">
              <button className="text-white hover:text-primary transition-colors text-sm font-medium">Earn</button>
              <button className="text-white hover:text-primary transition-colors text-sm font-medium">Blog</button>
              <div className="w-20 h-8" /> {/* Increased space for logo */}
              <button className="text-white hover:text-primary transition-colors text-sm font-medium">Docs</button>
              <button className="text-white hover:text-primary transition-colors text-sm font-medium">FAQ</button>
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
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-gray-900/90 hover:bg-gray-800 text-white hover:text-primary transition-all duration-300"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-gray-900/90 hover:bg-gray-800 text-white hover:text-primary transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              <span className="text-white">{"Dive deep into"}</span>
              <br />
              <span className="text-white">{"whaleboard"}</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
              {
                "A unified dashboard for your liquidity across cosmos chains to navigate through vast data seas and discover hidden insights beneath the surface."
              }
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-card/95 border-primary/20 shadow-2xl max-w-md w-full mx-auto">
            <div className="text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-card-foreground">{"Ready to Explore?"}</h2>

              <p className="text-muted-foreground text-balance">
                {
                  "Check out the beta version that serves as a proof of concept with working assets overviews and protocols integrations."
                }
              </p>

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                {"Start Your Journey"}
              </Button>
            </div>
          </Card>

          <div className="mt-16" />
        </div>

        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent/40 rounded-full" />
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-primary/20 rounded-full" />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-accent/30 rounded-full" />
      </main>

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{"Navigate the Interchain"}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">{"Unified Assets Management"}</h3>
              <p className="text-gray-600 leading-relaxed">
                {
                  "Track and manage your assets across multiple Cosmos chains from a single, intuitive dashboard. No more jumping between different interfaces."
                }
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">{"Defi & NFTs"}</h3>
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

          <div className="absolute w-48 h-48" style={{ transform: `rotate(${scrollRotation + 85}deg)` }}>
            <div
              className="absolute hover:scale-125 transition-transform duration-300"
              style={{
                top: `calc(50% - ${96}px - 20px)`,
                left: `calc(50% - 20px)`,
                transform: `rotate(${-(scrollRotation + 85)}deg)`,
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

          <div className="absolute w-72 h-72" style={{ transform: `rotate(${scrollRotation * 0.8 + 160}deg)` }}>
            <div
              className="absolute hover:scale-125 transition-transform duration-300"
              style={{
                top: `calc(50% - ${144}px - 20px)`,
                left: `calc(50% - 20px)`,
                transform: `rotate(${-(scrollRotation * 0.8 + 160)}deg)`,
              }}
            >
              <Image src="/chains/osmo.svg" alt="Osmosis" width={40} height={40} className="w-10 h-10 drop-shadow-lg" />
            </div>
          </div>

          <div className="absolute w-96 h-96" style={{ transform: `rotate(${scrollRotation * 0.6 + 310}deg)` }}>
            <div
              className="absolute hover:scale-125 transition-transform duration-300"
              style={{
                top: `calc(50% - ${192}px - 20px)`,
                left: `calc(50% - 20px)`,
                transform: `rotate(${-(scrollRotation * 0.6 + 310)}deg)`,
              }}
            >
              <Image src="/chains/dydx.svg" alt="dYdX" width={40} height={40} className="w-10 h-10 drop-shadow-lg" />
            </div>
          </div>

          <div
            className="absolute w-[30rem] h-[30rem]"
            style={{ transform: `rotate(${scrollRotation * 0.4 + 25}deg)` }}
          >
            <div
              className="absolute hover:scale-125 transition-transform duration-300"
              style={{
                top: `calc(50% - ${240}px - 20px)`,
                left: `calc(50% - 20px)`,
                transform: `rotate(${-(scrollRotation * 0.4 + 25)}deg)`,
              }}
            >
              <Image src="/chains/baby.svg" alt="Baby" width={40} height={40} className="w-10 h-10 drop-shadow-lg" />
            </div>
          </div>

          <div
            className="absolute w-[36rem] h-[36rem]"
            style={{ transform: `rotate(${scrollRotation * 0.3 + 220}deg)` }}
          >
            <div
              className="absolute hover:scale-125 transition-transform duration-300"
              style={{
                top: `calc(50% - ${288}px - 20px)`,
                left: `calc(50% - 20px)`,
                transform: `rotate(${-(scrollRotation * 0.3 + 220)}deg)`,
              }}
            >
              <Image src="/chains/noble.svg" alt="Noble" width={40} height={40} className="w-10 h-10 drop-shadow-lg" />
            </div>
          </div>

          <div
            className="absolute w-[42rem] h-[42rem]"
            style={{ transform: `rotate(${scrollRotation * 0.25 + 155}deg)` }}
          >
            <div
              className="absolute hover:scale-125 transition-transform duration-300"
              style={{
                top: `calc(50% - ${336}px - 20px)`,
                left: `calc(50% - 20px)`,
                transform: `rotate(${-(scrollRotation * 0.25 + 155)}deg)`,
              }}
            >
              <Image src="/chains/akt.svg" alt="Akash" width={40} height={40} className="w-10 h-10 drop-shadow-lg" />
            </div>
          </div>

          <div
            className="absolute w-[48rem] h-[48rem]"
            style={{ transform: `rotate(${scrollRotation * 0.2 + 340}deg)` }}
          >
            <div
              className="absolute hover:scale-125 transition-transform duration-300"
              style={{
                top: `calc(50% - ${384}px - 20px)`,
                left: `calc(50% - 20px)`,
                transform: `rotate(${-(scrollRotation * 0.2 + 340)}deg)`,
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
            className="absolute w-[54rem] h-[54rem]"
            style={{ transform: `rotate(${scrollRotation * 0.15 + 70}deg)` }}
          >
            <div
              className="absolute hover:scale-125 transition-transform duration-300"
              style={{
                top: `calc(50% - ${432}px - 20px)`,
                left: `calc(50% - 20px)`,
                transform: `rotate(${-(scrollRotation * 0.15 + 70)}deg)`,
              }}
            >
              <Image src="/chains/neutron.svg" alt="Neutron" width={40} height={40} className="w-10 h-10 drop-shadow-lg" />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{"Supported Chains"}</h2>
          <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
            {"Navigate through the cosmos ecosystem with integrated chain support"}
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">{"Integrated Protocols"}</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            {"Seamlessly connected to the leading protocols in the Cosmos ecosystem"}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[
              "Osmosis",
              "Noble",
              "Stargaze",
              "Akash",
              "Cosmos Hub",
              "Secret Network",
              "Kujira",
              "Injective",
              "Stride",
              "Evmos",
              "Persistence",
              "Comdex",
            ].map((protocol) => (
              <div
                key={protocol}
                className="p-4 rounded-lg bg-white border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <span className="text-gray-700 font-medium text-sm md:text-base">{protocol}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
