"use client";
// hooks/useTokenBalance.ts
import { useBalance } from "@thirdweb-dev/react";

export function useTokenBalance(tokenAddress: string) {
  const { data, isLoading, error } = useBalance(tokenAddress);
  console.log(data, isLoading, error, "data, isLoading, error");

  return { data, isLoading, error };
}
