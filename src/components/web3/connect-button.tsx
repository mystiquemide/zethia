"use client"
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi"
import { Button } from "@/components/ui/button"

export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <Button variant="outline" size="sm" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button size="sm" onClick={() => connect({ connector: connectors[0] })}>
      Connect Wallet
    </Button>
  )
}
