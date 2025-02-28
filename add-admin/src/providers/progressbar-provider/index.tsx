"use client"; // Ensure this is a client component

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct for App Router
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import default styles

NProgress.configure({ showSpinner: false });

export default function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    // Manually handle history changes (App Router doesn't expose events like pages router)
    const pushState = history.pushState;
    const replaceState = history.replaceState;

    const handleRouteChange = () => {
      handleStart();
      setTimeout(() => handleStop(), 500); // Ensures smooth transition
    };

    history.pushState = function (...args) {
      pushState.apply(history, args);
      handleRouteChange();
    };

    history.replaceState = function (...args) {
      replaceState.apply(history, args);
      handleRouteChange();
    };

    return () => {
      history.pushState = pushState;
      history.replaceState = replaceState;
    };
  }, []);

  return <>{children}</>;
}
