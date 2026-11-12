"use client";

import dynamic from "next/dynamic";

const DynamicJourneyTrainScene = dynamic(
  () => import("./DynamicJourneyTrainScene"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#8FBF7A] border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

export default DynamicJourneyTrainScene;

