"use client";
import BigNumber from "bignumber.js";

declare let window: any;
import { createContext, useContext, useState, ReactNode } from "react";
import Web3 from "web3";
import Polymarket from "../../src/abis/Polymarket.json";
import PolyToken from "../../src/abis/PolyToken.json";
import { MarketProps } from "../types";
interface DataContextProps {
  account: string;
  loading: boolean;
  loadWeb3: () => Promise<void>;
  polymarket: any;
  polyToken: any;
  market: MarketProps | null;
  setMarket: (market: MarketProps) => void;
  calculatePercentage: (totalAmount: any, optionAmount: any) => string;
}

const DataContext = createContext<DataContextProps>({
  account: "",
  loading: true,
  loadWeb3: async () => {},
  polymarket: null,
  polyToken: null,
  market: null,
  setMarket: () => {},
  calculatePercentage: () => "0%",
});

export const DataProvider: any = ({ children }: { children: ReactNode }) => {
  const data = useProviderData();

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext<DataContextProps>(DataContext);
export const useProviderData = () => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [polymarket, setPolymarket] = useState<any>();
  const [polyToken, setPolyToken] = useState<any>();
  const [market, setMarket] = useState<MarketProps | null>(null);
  const calculatePercentage = (
    totalAmount: BigNumber | string,
    optionAmount: BigNumber | string
  ) => {
    const total = new BigNumber(totalAmount || 0);
    const option = new BigNumber(optionAmount || 0);

    return total.isZero()
      ? "0%"
      : `${option.dividedBy(total).times(100).toFixed(2)}%`;
  };
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-Eth browser detected. Please consider using MetaMask.");
      return;
    }
    var allAccounts = await window.web3.eth.getAccounts();
    setAccount(allAccounts[0]);
    await loadBlockchainData();
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const polymarketData = Polymarket.networks["11155111"];
    const polyTokenData = PolyToken.networks["11155111"];

    if (polymarketData && polyTokenData) {
      var tempContract = await new web3.eth.Contract(
        Polymarket.abi,
        polymarketData.address
      );
      setPolymarket(tempContract);
      var tempTokenContract = await new web3.eth.Contract(
        PolyToken.abi,
        polyTokenData.address
      );

      setPolyToken(tempTokenContract);
    } else {
      window.alert("TestNet not found");
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return {
    account,
    loading,
    loadWeb3,
    polymarket,
    polyToken,
    market,
    setMarket,
    calculatePercentage,
  };
};
