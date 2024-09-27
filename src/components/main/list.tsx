import React from "react";
import { ParkingData } from "../../interfaces/parkingData";

interface ListProps {
  parkingData: ParkingData[]; // 주차장 데이터 배열
}

export default function List({ parkingData }: ListProps) {
  return (
    <div className="flex flex-col gap-5 pt-6 border-t border-gray-300 border-t-1">
      {parkingData.map(parking => (
        <div
          key={parking.LAT}
          className="flex flex-col gap-3 py-2 border-b border-gray-200"
        >
          <h2 className="text-3xl font-light text-secondary">
            {parking.PKLT_NM}
          </h2>
          <p className="font-light text-gray">
            {parking.ADDR} / {parking.PRK_TYPE_NM} / 기본 요금:
            {parking.BSC_PRK_CRG}원
          </p>
          <p className="pb-4 font-light text-secondary">상세보기</p>
        </div>
      ))}
    </div>
  );
}
