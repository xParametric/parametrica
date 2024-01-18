"use client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export function LocalizationProviderWrapper({ children }: { children: any }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  );
}
