// src/app/loading.tsx
import React from "react";

/**
*  Loading component
* Used to show a loading state
* when the app is first opened
*/
const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <div className="relative">
      <div className="w-16 h-16 border-t-4 border-b-4 border-black rounded-full animate-spin"></div>
      <div
        className="absolute top-0 left-0 w-16 h-16 border-t-4 border-b-4 border-black rounded-full animate-spin"
        style={{ animationDirection: "reverse", animationDuration: "1s" }}
      ></div>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4">
        <h2 className="text-xl font-bold text-black">Loading</h2>
      </div>
    </div>
  </div>
    )
  }
export default Loading;