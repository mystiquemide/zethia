import type { Metadata } from "next"
// Using system font stack to avoid Google Fonts fetch issues
import "./globals.css"
import { Nav } from "@/components/layout/nav"
import { Footer } from "@/components/layout/footer"
import { ToastProvider } from "@/components/ui/toast"

// System fonts
// System fonts

export const metadata: Metadata = {
  title: "Zethia — Prove Everything. Reveal Nothing.",
  description: "Zero-knowledge credentials for Stellar DeFi. Prove creditworthiness without revealing your balance. KYC once, verify everywhere.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased dark`}>
      <body className="min-h-full bg-gray-950 text-gray-100 flex flex-col">
        <ToastProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  )
}
