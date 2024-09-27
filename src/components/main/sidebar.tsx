import React from "react";
import Header from "../layout/header";
import Input from "../common/input";
import List from "./list";
import LoadingSpinner from "../common/loadingSpinner";
import useSidebar from "../../hooks/useSidebar";

export default function Sidebar() {
  const {
    region,
    handleInputChange,
    inputValue,
    parkingData,
    isLoading,
    scrollableRef,
  } = useSidebar();
  return (
    <div className="relative h-full">
      <Header />
      <Input onInputChange={handleInputChange} value={inputValue} />
      <h1 className="py-8 text-4xl">
        {region
          ? `${region} 근처 주차장이에요.`
          : "주차장 정보를 찾고 있습니다..."}
      </h1>
      <div
        className="flex-grow max-h-[calc(100vh-200px)] overflow-y-auto"
        ref={scrollableRef}
      >
        <List parkingData={parkingData} />
        {isLoading && <LoadingSpinner type={6} />}
      </div>
    </div>
  );
}
