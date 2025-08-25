import React from "react";

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-28 h-28 border-10 border-gray-300 border-t-[#00A8CC] rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 text-sm">Loading...</p>
    </div>
  );
};