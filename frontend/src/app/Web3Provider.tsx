"use client";

import { SiweMessage } from "siwe";
import { APP_NAME } from "@/lib/consts";
import { FC, PropsWithChildren } from "react";
import { WagmiConfig, createConfig, sepolia } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";

// import UserModel from "@/models/userModel";
// import axios from "axios";

import {
  ConnectKitProvider,
  SIWEConfig,
  SIWEProvider,
  getDefaultConfig,
} from "connectkit";

const chains = [sepolia];
const config = createConfig(
  getDefaultConfig({
    appName: APP_NAME,
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains,
  })
);

const siweConfig = {
  getNonce: async () => {
    const res = await fetch(`/api/siwe`, { method: "PUT" });
    if (!res.ok) throw new Error("Failed to fetch SIWE nonce");

    return res.text();
  },
  createMessage: ({ nonce, address, chainId }) => {
    return new SiweMessage({
      nonce,
      chainId,
      address,
      version: "1",
      uri: window.location.origin,
      domain: window.location.host,
      statement: "Sign In With Ethereum to prove you control this wallet.",
    }).prepareMessage();
  },
  verifyMessage: ({ message, signature }) => {
    return fetch(`/api/siwe`, {
      method: "POST",
      body: JSON.stringify({ message, signature }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.ok);
  },

  getSession: async () => {
    const res = await fetch(`/api/siwe`);
    if (!res.ok) throw new Error("Failed to fetch SIWE session");

    const { address, chainId } = await res.json();
    // const dbResponse = await axios.post("/api/createUser", {
    //   walletAddress: address,
    //   chainId: chainId,
    // });
    // if (!dbResponse.data) {
    //   console.log("Error creating user in MongoDB");
    // }
    // const { walletAddress } = dbResponse.data;
    // return {
    //   address,
    //   chainId,
    // };

    // if (address && chainId) {
    //   try {
    //     await dbConnect();
    //     const user = await UserModel.findOne({ walletAddress: address });

    //     if (!user) {
    //       const createUser = await UserModel.create({
    //         walletAddress: address,
    //         chainId,

    //         //,unique_id: unique_id
    //       });
    //       if (!createUser) {
    //         console.log("Error creating user in MongoDB");
    //       } else {
    //         // return res.status.send("Success");
    //       }
    //     } else {
    //       // Update the chainId if the user already exists
    //       user.chainId = chainId;
    //       await user.save();
    //     }
    //   } catch (error) {
    //     console.error("Error saving user data to MongoDB:", error);
    //   }
    // }

    // localStorage.setItem(`address-${chainId}`, address || "");
    // localStorage.setItem(`chainId`, chainId || "");

    return address && chainId ? { address, chainId } : null;
  },

  signOut: () => fetch(`/api/siwe`, { method: "DELETE" }).then((res) => res.ok),
} satisfies SIWEConfig;

const Web3Provider: FC<PropsWithChildren<{}>> = ({ children }) => (
  <WagmiConfig config={config}>
    <SIWEProvider {...siweConfig}>
      <ConnectKitProvider theme="nouns">{children}</ConnectKitProvider>
    </SIWEProvider>
  </WagmiConfig>
);

export default Web3Provider;
