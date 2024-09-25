import React from "react";
import Sidebar from "../../components/main/sidebar";
import Map from "../../components/main/map";

export default function Main() {
  return (
    <div className="flex flex-row items-center justify-center w-full h-screen text-2xl bg-white">
      <div className="w-[32%] h-full p-6">
        <Sidebar />
      </div>
      <div className="w-[68%] h-full p-6">
        <Map />
      </div>
    </div>
  );
}
