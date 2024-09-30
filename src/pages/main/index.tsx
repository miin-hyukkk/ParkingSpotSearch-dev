import React, { useState } from "react";
import Sidebar from "../../components/main/sidebar";
import Map from "../../components/main/map";

export default function Main() {
  const [isMapVisible, setIsMapVisible] = useState(true);
  const [isApiCalled, setIsApiCalled] = useState(false);

  const handleParkingSelect = () => {
    if (window.innerWidth < 1024) {
      setIsMapVisible(true);
      setIsApiCalled(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen text-2xl bg-white lg:flex-row">
      <div className="w-full lg:w-[32%] h-screen p-6">
        <Sidebar
          onParkingSelect={handleParkingSelect}
          isApiCalled={isApiCalled}
          setIsApiCalled={setIsApiCalled}
        />
      </div>
      <div
        className={`w-full lg:w-[68%] h-full ${isMapVisible && !isApiCalled ? "block lg:block" : "hidden lg:block"}`}
      >
        <Map />
      </div>
    </div>
  );
}
