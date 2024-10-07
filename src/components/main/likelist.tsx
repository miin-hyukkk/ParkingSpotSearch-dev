import React, { useEffect, useState } from "react";

interface ParkingInfo {
  ADDR: string;
  PKLT_NM: string;
  PRD_AMT: string;
  PRK_STTS_YN: string;
}

export default function LikeList() {
  const [parkingList, setParkingList] = useState<ParkingInfo[]>([]);

  useEffect(() => {
    // 로컬스토리지에서 주차장 데이터를 가져와서 state에 저장
    const storedParkingList: ParkingInfo[] = [];

    Object.keys(localStorage).forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          const parsedItem: ParkingInfo = JSON.parse(item);
          if (parsedItem.ADDR && parsedItem.PKLT_NM) {
            // 필요한 주차장 정보가 포함된 항목만 추가
            storedParkingList.push(parsedItem);
          }
        } catch (error) {
          console.error("Error parsing item from localStorage:", error);
        }
      }
    });

    setParkingList(storedParkingList);
  }, []);

  // 로컬스토리지에서 주차장 아이템 삭제 함수
  const handleDelete = (parkingName: string) => {
    localStorage.removeItem(parkingName);
    setParkingList(prevList =>
      prevList.filter(parking => parking.PKLT_NM !== parkingName),
    );
  };

  return (
    <div className="relative px-6 overflow-y-auto">
      <h1 className="py-8 text-4xl">즐겨찾기</h1>
      <div className="relative flex flex-col gap-5 pt-6 border-t border-gray-300 border-t-1">
        {/* 주차장 데이터가 없을 때 표시 */}
        {parkingList.length === 0 && (
          <p className="py-8 text-center text-gray-500">
            저장된 즐겨찾기가 없습니다.
          </p>
        )}

        {/* 주차장 데이터를 map으로 렌더링 */}
        {parkingList.map(parking => (
          <div
            key={parking.PKLT_NM}
            className="flex flex-col gap-3 py-2 border-b border-gray-200 cursor-pointer"
          >
            <h2 className="text-3xl font-light text-secondary">
              {parking.PKLT_NM}
            </h2>
            <p className="font-light text-gray">
              {parking.ADDR} / {parking.PRD_AMT}
            </p>
            <p className="pb-4 font-light text-secondary">상세보기</p>
            <div
              className="absolute right-0 translate-y-full cursor-pointer"
              onClick={() => handleDelete(parking.PKLT_NM)}
              role="button"
              aria-label={`Delete ${parking.PKLT_NM} from favorites`}
              tabIndex={0} // 키보드 접근성을 위한 tabIndex 추가
              onKeyPress={e =>
                e.key === "Enter" && handleDelete(parking.PKLT_NM)
              } // 키보드 이벤트 핸들러
            >
              X
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
