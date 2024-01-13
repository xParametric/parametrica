"use client";
import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import ClientLayout from "./Web3Provider";
import { FC, PropsWithChildren } from "react";
import theme from "@/styles/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import { DataProvider } from "@/context/DataContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import store from "@/redux/store";
// import { ReduxProvider } from "@/redux/provider";
// const raleway = Raleway({
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Parametrica",
  description:
    "Parametrica is a decentralized climate prediction market. It is a transparent, secure, and user-friendly platform where participants can speculate, transfer and invest in climate-related risk.",
};

const RootLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {/* <ReduxProvider> */}{" "}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DataProvider>
              <ClientLayout>
                <Header />
                {children}
                <Footer />
              </ClientLayout>
            </DataProvider>
          </LocalizationProvider>
        </ThemeProvider>
        {/* </ReduxProvider> */}
      </body>
    </html>
  );
};

export default RootLayout;
