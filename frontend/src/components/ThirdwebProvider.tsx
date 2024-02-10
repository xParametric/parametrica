"use client";
import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import React from "react";

function ThirdwebProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
        coinbaseWallet(),
        walletConnect(),
      ]}
      clientId="531dd9267d5705c5ca733d0ea910d335"
      activeChain={Sepolia}
      supportedChains={[Sepolia]}
    >
      {children}
    </ThirdwebProvider>
  );
}

export default ThirdwebProviderWrapper;
