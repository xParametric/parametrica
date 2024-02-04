"use client";
import { useMemo } from "react";

import {
  ConnectWallet,
  darkTheme,
  useBalance,
  useChain,
  useAddress,
} from "@thirdweb-dev/react";
import { useEffect } from "react";

function ConnectWalletButton() {
  const { data, isLoading } = useBalance();
  const address = useAddress();
  const chain = useChain();

  const account = useMemo(() => {
    return {
      balance: data,
      address: address,
      chain: chain,
    };
  }, [data, address, chain]);

  return (
    <div>
      <ConnectWallet
        theme={darkTheme({
          colors: {
            accentText: "#bdff00",
            accentButtonBg: "#bdff00",
          },
        })}
        switchToActiveChain={true}
        modalSize={"wide"}
        welcomeScreen={{}}
        modalTitleIconUrl={""}
      />
    </div>
  );
}

export default ConnectWalletButton;
