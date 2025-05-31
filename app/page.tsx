import { WalletComparison } from "@/components/wallet-comparison"
import { Hero } from "@/components/hero"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <WalletComparison />
      <Footer />
    </div>
  )
}
