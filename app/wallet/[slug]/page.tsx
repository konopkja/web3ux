import { notFound } from "next/navigation"
import WalletDetail from "@/components/wallet-detail"
import { walletData } from "@/data/wallets"

interface WalletPageProps {
  params: {
    slug: string
  }
}

export default function WalletPage({ params }: WalletPageProps) {
  const walletName = params.slug.replace(/-/g, " ")
  const wallet = walletData.find((w) => w.name.toLowerCase() === walletName.toLowerCase())

  if (!wallet) {
    notFound()
  }

  return <WalletDetail wallet={wallet} />
}

export function generateStaticParams() {
  return walletData.map((wallet) => ({
    slug: wallet.name.toLowerCase().replace(/\s+/g, "-"),
  }))
}

export function generateMetadata({ params }: WalletPageProps) {
  const walletName = params.slug.replace(/-/g, " ")
  const wallet = walletData.find((w) => w.name.toLowerCase() === walletName.toLowerCase())

  if (!wallet) {
    return {
      title: "Wallet Not Found",
    }
  }

  return {
    title: `${wallet.name} - Web3UX Analysis`,
    description: `Detailed UX analysis of ${wallet.name} wallet including onboarding, UI design, and user experience evaluation.`,
  }
}
