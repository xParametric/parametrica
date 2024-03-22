"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const NPProgress = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#5155a6"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default NPProgress;
