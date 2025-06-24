"use client";

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  return (
    <div className="fixed inset-0 bg-background text-primary flex items-center justify-center z-[9999]">
      <h1 className="text-4xl font-bold font-instrumentserif animate-pulse">
        Almasrzld.
      </h1>
    </div>
  );
};

export default SplashScreen;
