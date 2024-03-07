"use client";
// import { useMemo } from "react";
// import react from "react";

import {
  ConnectWallet,
  darkTheme,
  // useBalance,
  // useChain,
  // useAddress,
} from "@thirdweb-dev/react";
// import { useEffect } from "react";

function ConnectWalletButton() {
  // const { data, isLoading } = useBalance();
  // const address = useAddress();
  // const chain = useChain();

  // const account = useMemo(() => {
  //   return {
  //     balance: data,
  //     address: address,
  //     chain: chain,
  //   };
  // }, [data, address, chain]);

  return (
    <div>
      <ConnectWallet
        theme={darkTheme({
          colors: {
            accentText: "#5155a6",
            accentButtonBg: "#5155a6",
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
