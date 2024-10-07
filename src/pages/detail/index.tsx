import React from "react";
import { useLocation } from "react-router-dom";
import useDetail from "../../hooks/useDetail";
import LoadingSpinner from "../../components/common/loadingSpinner";

export default function Detail() {
  const { state } = useLocation();
  const { 항목, 시간표, 금액정보 } = useDetail();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="flex flex-col justify-center w-3/5 h-full p-5 border-x border-gray_2">
        <h1 className="py-5 mb-4 text-5xl font-bold text-blue-500">
          {state.PKLT_NM}
        </h1>
        {state ? (
          <div className="flex flex-col gap-5 p-4">
            {항목.map(item => (
              <div className="flex justify-between text-3xl">
                <p>{item.label}</p>
                <p>{item.value}</p>
              </div>
            ))}
            <div className="overflow-x-auto">
              <div className="grid grid-cols-3 gap-2 text-xl bg-gray_2">
                {금액정보.map(item => (
                  <div
                    key={item.label}
                    className="px-6 py-3 font-semibold text-center text-gray-600"
                  >
                    {item.label}
                  </div>
                ))}
                {금액정보.map(item => (
                  <div key={item.label} className="px-6 py-3 text-center">
                    {item.value}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-2xl text-red-500">
              * 토요일 {state.SAT_CHGD_FREE_NM} / 공휴일
              {state.LHLDY_CHGD_FREE_SE_NAME}
            </p>
            <p className="text-3xl">운영 시간</p>
            {시간표.map(시간항목 => (
              <div className="flex justify-between text-2xl">
                <p>{시간항목.label}</p>
                <p>{시간항목.시간}</p>
              </div>
            ))}
          </div>
        ) : (
          <LoadingSpinner type={6} />
        )}
      </div>
    </div>
  );
}
