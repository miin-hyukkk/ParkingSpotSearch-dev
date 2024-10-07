import React from "react";
import { useNavigate } from "react-router-dom";
import { ParkingData } from "../../interfaces/parkingData";

interface ListProps {
  parkingData: ParkingData[];
  onItemClick: (parking: ParkingData) => void;
}

export default function List({ parkingData, onItemClick }: ListProps) {
  const navigate = useNavigate();

  const handleKeyDown = (
    parking: ParkingData,
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    // Enter 키 또는 Space 키가 눌렸을 때 클릭 핸들러 호출 (베리어 프리)
    if (event.key === "Enter" || event.key === " ") {
      onItemClick(parking);
    }
  };

  return (
    <div className="flex flex-col gap-5 pt-6 border-t border-gray-300 border-t-1">
      {parkingData.map(parking => (
        <div
          key={parking.LAT}
          className="flex flex-col gap-3 py-2 border-b border-gray-200 cursor-pointer "
          onClick={() => onItemClick(parking)}
          onKeyDown={event => handleKeyDown(parking, event)} // 키보드 이벤트 추가(장애가 있는 사용자. 베리어 프리)
          tabIndex={0} // 요소를 포커스 가능하게 설정
          role="button"
        >
          <h2 className="text-3xl font-light text-secondary">
            {parking.PKLT_NM}
          </h2>
          <p className="font-light text-gray">
            {parking.ADDR} / {parking.PRK_TYPE_NM} / 기본 요금:
            {parking.BSC_PRK_CRG}원
          </p>
          <button
            className="self-start py-1 text-sm text-xl font-light cursor-pointer text-secondary hover:underline"
            type="button"
            onClick={() =>
              navigate(`/detail/${parking.PKLT_NM}`, {
                state: { parking },
              })
            }
          >
            상세보기
          </button>
        </div>
      ))}
    </div>
  );
}
