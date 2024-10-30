import React from "react";

const GradientBottom = () => {
  return (
    <div className="absolute left-0 right-0 w-full">
      <div className=" fixed bottom-0 z-10 h-24 w-full bg-gradient-to-t from-white via-white/60 to-transparent  dark:from-dark dark:via-dark/60 dark:to-transparent"></div>
    </div>
  );
};

export default GradientBottom;
