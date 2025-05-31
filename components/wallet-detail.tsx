"use client"

import {
  ArrowLeft,
  Star,
  TrendingUp,
  Zap,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Camera,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { walletData } from "@/data/wallets"
import { Footer } from "@/components/footer"
import { ImageGallery } from "@/components/image-gallery"
import Image from "next/image"

interface Wallet {
  name: string
  onboarding: number
  uiDesign: number
  uxIssues: number
  notes: string
  uniqueFeatures: string[]
  good: string[]
  uxIssuesList: string[]
  icon: string
}

interface WalletDetailProps {
  wallet: Wallet
}

export default function WalletDetail({ wallet }: WalletDetailProps) {
  const router = useRouter()

  const currentIndex = walletData.findIndex((w) => w.name === wallet.name)
  const previousWallet = walletData[currentIndex - 1]
  const nextWallet = walletData[currentIndex + 1]

  const getScoreColor = (score: number, isIssues = false) => {
    if (isIssues) {
      if (score === 0) return "text-white"
      return "text-red-400"
    }
    if (score >= 4.5) return "text-green-400"
    if (score >= 3.5) return "text-yellow-400"
    return "text-red-400"
  }

  const navigateToWallet = (walletName: string) => {
    const slug = walletName.toLowerCase().replace(/\s+/g, "-")
    router.push(`/wallet/${slug}`)
  }

  const overallScore = ((wallet.onboarding + wallet.uiDesign - wallet.uxIssues / 2) / 2).toFixed(1)

  // 1inch wallet screenshots
  const inchScreenshots =
    wallet.name === "1inch"
      ? [
          {
            src: "/screenshots/1inch-home.png",
            alt: "1inch wallet home screen",
            description:
              "Home screen with 'Stories' section that is overwhelming with too many uninteresting shorts inside.",
          },
          {
            src: "/screenshots/1inch-send.png",
            alt: "1inch wallet send screen",
            description:
              "Send transaction screen with jargon that could be easily removed by using simpler terms like 'Transaction Fee'.",
          },
          {
            src: "/screenshots/1inch-token.png",
            alt: "1inch wallet token details",
            description: "Token details screen showing Ether not being tracked, which doesn't seem right.",
          },
          {
            src: "/screenshots/1inch-receive.png",
            alt: "1inch wallet receive screen",
            description:
              "Receive screen missing description & guidance for beginners, especially for those not used to QR codes.",
          },
          {
            src: "/screenshots/1inch-success.png",
            alt: "1inch wallet success screen",
            description: "Success screen where only 'Congratulations' should be bold for better visual hierarchy.",
          },
        ]
      : []

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Comparison
            </Button>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-lg font-semibold">{overallScore}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image
              src={wallet.icon || "/placeholder.svg"}
              alt={`${wallet.name} icon`}
              width={64}
              height={64}
              className="rounded-xl"
            />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              {wallet.name}
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">{wallet.notes}</p>
        </div>

        {/* Navigation between wallets */}
        <div className="flex justify-between items-center mb-8">
          {previousWallet ? (
            <Button
              variant="ghost"
              onClick={() => navigateToWallet(previousWallet.name)}
              className="flex items-center gap-2 text-gray-400 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              <Image
                src={previousWallet.icon || "/placeholder.svg"}
                alt={`${previousWallet.name} icon`}
                width={24}
                height={24}
                className="rounded"
              />
              {previousWallet.name}
            </Button>
          ) : (
            <div />
          )}

          {nextWallet ? (
            <Button
              variant="ghost"
              onClick={() => navigateToWallet(nextWallet.name)}
              className="flex items-center gap-2 text-gray-400 hover:text-white"
            >
              {nextWallet.name}
              <Image
                src={nextWallet.icon || "/placeholder.svg"}
                alt={`${nextWallet.name} icon`}
                width={24}
                height={24}
                className="rounded"
              />
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <div />
          )}
        </div>

        {/* Metrics Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-[#0f0f0f]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Onboarding
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className={`text-5xl font-bold ${getScoreColor(wallet.onboarding)}`}>{wallet.onboarding}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f0f0f]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5 text-purple-400" />
                UI Design
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className={`text-5xl font-bold ${getScoreColor(wallet.uiDesign)}`}>{wallet.uiDesign}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f0f0f]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                UX Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className={`text-5xl font-bold ${getScoreColor(wallet.uxIssues, true)}`}>{wallet.uxIssues}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Strengths */}
          <Card className="bg-[#0f0f0f]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CheckCircle className="h-6 w-6 text-green-400" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              {wallet.good.length > 0 ? (
                <ul className="space-y-3">
                  {wallet.good.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-400 mt-1 text-sm">✓</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No strengths documented.</p>
              )}
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card className="bg-[#0f0f0f]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              {wallet.uxIssuesList.length > 0 ? (
                <ul className="space-y-3">
                  {wallet.uxIssuesList.map((issue, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-red-400 mt-1 text-sm">!</span>
                      <span className="text-gray-300">{issue}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No issues documented.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Unique Features */}
        {wallet.uniqueFeatures.length > 0 && (
          <Card className="bg-[#0f0f0f] mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Star className="h-6 w-6 text-purple-400" />
                Unique Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {wallet.uniqueFeatures.map((feature, index) => (
                  <div key={index} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <p className="text-gray-300">{feature}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Screenshots */}
        <Card className="bg-[#0f0f0f] mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Camera className="h-6 w-6 text-blue-400" />
              Screenshots
            </CardTitle>
          </CardHeader>
          <CardContent>
            {wallet.name === "1inch" && inchScreenshots.length > 0 ? (
              <ImageGallery images={inchScreenshots} />
            ) : (
              <p className="text-gray-500">No screenshots available yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center">
          <Button onClick={() => router.push("/")} className="bg-white text-black hover:bg-gray-200 px-8 py-3">
            Back to Comparison
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
