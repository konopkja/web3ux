"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star } from "lucide-react"
import { walletData } from "@/data/wallets"
import Image from "next/image"

export function WalletComparison() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("overall")
  const router = useRouter()

  const filteredWallets = walletData
    .filter(
      (wallet) =>
        wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wallet.uniqueFeatures.some((feature) => feature.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "onboarding":
          return b.onboarding - a.onboarding
        case "design":
          return b.uiDesign - a.uiDesign
        case "ux":
          return a.uxIssues - b.uxIssues
        default:
          return b.onboarding + b.uiDesign - b.uxIssues - (a.onboarding + a.uiDesign - a.uxIssues)
      }
    })

  const getScoreColor = (score: number, isIssues = false) => {
    if (isIssues) {
      if (score <= 3) return "text-green-400"
      if (score <= 6) return "text-yellow-400"
      return "text-red-400"
    }
    if (score >= 4.5) return "text-green-400"
    if (score >= 3.5) return "text-yellow-400"
    return "text-red-400"
  }

  const handleWalletClick = (walletName: string) => {
    const slug = walletName.toLowerCase().replace(/\s+/g, "-")
    router.push(`/wallet/${slug}`)
  }

  return (
    <section id="comparison" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-left mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Wallet Comparison</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search wallets or features..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-transparent border-gray-700 text-white"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48 bg-transparent border-gray-700 text-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700">
            <SelectItem value="overall">Overall Score</SelectItem>
            <SelectItem value="onboarding">Onboarding</SelectItem>
            <SelectItem value="design">UI Design</SelectItem>
            <SelectItem value="ux">UX Issues (fewer is better)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Wallet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWallets.map((wallet) => (
          <Card
            key={wallet.name}
            className="bg-[#0f0f0f] hover:bg-[#1a1a1a] transition-all cursor-pointer group hover:scale-105"
            onClick={() => handleWalletClick(wallet.name)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={wallet.icon || "/placeholder.svg"}
                    alt={`${wallet.name} icon`}
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <span className="text-xl">{wallet.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-gray-400">
                    {((wallet.onboarding + wallet.uiDesign - wallet.uxIssues / 2) / 2).toFixed(1)}
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Onboarding</span>
                  <span className={`font-semibold ${getScoreColor(wallet.onboarding)}`}>{wallet.onboarding}/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">UI Design</span>
                  <span className={`font-semibold ${getScoreColor(wallet.uiDesign)}`}>{wallet.uiDesign}/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">UX Issues</span>
                  <span className="font-semibold text-red-400">{wallet.uxIssues}</span>
                </div>

                {wallet.uniqueFeatures.length > 0 && (
                  <div className="pt-2">
                    <p className="text-xs text-gray-500 mb-2">Key Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {wallet.uniqueFeatures.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                          {feature.length > 20 ? `${feature.substring(0, 20)}...` : feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
