"use client";

import { useState, useEffect } from "react";
import SplashScreen from "../common/splash-screen";

const SplashWrapper = ({ children }: { children: React.ReactNode }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // splash 2 detik
    return () => clearTimeout(timer);
  }, []);

  return <>{showSplash ? <SplashScreen onFinish={() => {}} /> : children}</>;
};

export default SplashWrapper;
