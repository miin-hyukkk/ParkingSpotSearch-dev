import React, { useState } from "react";
import Header from "../../components/layout/header";
import Sidebar from "../../components/main/sidebar";
import Map from "../../components/main/map";
import LikeList from "../../components/main/likelist";

export default function Main() {
  // 북마크 상태 관리
  const [isBookmarked, setIsBookmarked] = useState(false);
  // Sidebar와 LikeList 전환 상태 관리
  const [showLikeList, setShowLikeList] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(true);
  const [isApiCalled, setIsApiCalled] = useState(false);

  const handleParkingSelect = () => {
    if (window.innerWidth < 1024) {
      setIsMapVisible(true);
      setIsApiCalled(false);
    }
  };

  // 북마크 상태 변경 시 Sidebar와 LikeList 전환
  const toggleBookmark = () => {
    setIsBookmarked(prev => !prev);
    setShowLikeList(prev => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen text-2xl bg-white lg:flex-row">
      <div className="w-full lg:w-[32%] h-screen p-6">
        {/* Header에 북마크 상태와 변경 함수 전달 */}
        <Header isBookmarked={isBookmarked} toggleBookmark={toggleBookmark} />
        {showLikeList ? (
          <LikeList />
        ) : (
          <Sidebar
            onParkingSelect={handleParkingSelect}
            isApiCalled={isApiCalled}
            setIsApiCalled={setIsApiCalled}
          />
        )}
      </div>
      <div
        className={`w-full lg:w-[68%] h-full ${
          isMapVisible && !isApiCalled ? "block lg:block" : "hidden lg:block"
        }`}
      >
        <Map />
      </div>
    </div>
  );
}
