import React from "react";
import Header from "../layout/header";
import Input from "../common/input";
import List from "./list";
import LoadingSpinner from "../common/loadingSpinner";
import useSidebar from "../../hooks/useSidebar";
import { ParkingData } from "../../interfaces/parkingData";

interface SidebarProps {
  onParkingSelect: (parking: ParkingData) => void;
  isApiCalled: boolean;
  setIsApiCalled: (value: boolean) => void;
}
export default function Sidebar({
  onParkingSelect,
  isApiCalled,
  setIsApiCalled,
}: SidebarProps) {
  const {
    region,
    handleInputChange,
    inputValue,
    parkingData,
    isLoading,
    scrollableRef,
  } = useSidebar();

  const handleInput = (value: string) => {
    handleInputChange(value);
    setIsApiCalled(true);
  };

  return (
    <div className="relative px-6 overflow-y-auto">
      <Header />
      <Input onInputChange={handleInput} value={inputValue} />
      {isApiCalled ? (
        <>
          <h1 className="py-8 text-4xl">
            {region
              ? `${region} 근처 주차장이에요.`
              : "주차장 정보를 찾고 있습니다..."}
          </h1>
          <div
            className="flex-grow max-h-[calc(100vh-200px)] overflow-y-auto"
            ref={scrollableRef}
          >
            <List parkingData={parkingData} onItemClick={onParkingSelect} />
            {isLoading && <LoadingSpinner type={6} />}
          </div>
        </>
      ) : null}
    </div>
  );
}
