import React from "react";
import { useLocation } from "react-router-dom";

export default function Detail() {
  // 북마크 상태 관리
  const { state } = useLocation();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="flex flex-col justify-center w-3/5 h-full p-5 border-x border-gray_2">
        <h1 className="py-5 mb-4 text-5xl font-bold text-blue-500">
          {state.PKLT_NM}
        </h1>
        {state ? (
          <div className="flex flex-col gap-5 p-4">
            <div className="flex justify-between text-2xl">
              <p>정보업데이트</p>
              <p>{state.NOW_PRK_VHCL_UPDT_TM}</p>
            </div>
            <p className="text-3xl text-gray">
              현재 주차 가능 {state.NOW_PRK_VHCL_CNT}대 / 전체 주차 공간
              {state.TPKCT}대
            </p>
            <div className="flex justify-between text-3xl">
              <p>종류</p>
              <p>{state.PRK_TYPE_NM}</p>
            </div>
            <div className="flex justify-between text-3xl">
              <p>주소</p>
              <p>{state.ADDR}</p>
            </div>
            <div className="flex justify-between text-3xl">
              <p>전화번호</p>
              <p>{state.TELNO}</p>
            </div>
            <div className="flex justify-between text-3xl">
              <p>요금 정보</p>
              <p>{state.PAY_YN_NM}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray_2">
                <thead>
                  <tr className="text-sm leading-normal text-gray-600 text-gray ">
                    <th className="px-6 py-3 text-center border-r border-gray">
                      기본 금액
                    </th>
                    <th className="px-6 py-3 text-center border-r border-gray">
                      추가 금액
                    </th>
                    <th className="px-6 py-3 text-center">일 최대 금액</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-light text-gray-600">
                  <tr className="border-t border-gray">
                    <td className="px-6 py-3 text-center border-r border-gray">
                      {state.BSC_PRK_CRG}원
                    </td>
                    <td className="px-6 py-3 text-center border-r border-gray">
                      {state.ADD_PRK_CRG}원
                    </td>
                    <td className="px-6 py-3 text-center ">
                      {state.DAY_MAX_CRG}원
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-2xl text-red-500">
              * 토요일 {state.SAT_CHGD_FREE_NM} / 공휴일
              {state.LHLDY_CHGD_FREE_SE_NAME}
            </p>

            <div className="flex justify-between text-3xl">
              <p>정기권 금액</p>
              <p>{state.PRD_AMT}원</p>
            </div>
            <div className="flex justify-between text-3xl">
              <p>야간개방</p>
              <p>{state.NGHT_PAY_YN_NM}</p>
            </div>
            <p className="text-3xl">운영 시간</p>
            <div className="flex justify-between text-2xl">
              <p>평일</p>
              <p>
                {state.WD_OPER_BGNG_TM}~{state.WD_OPER_END_TM}
              </p>
            </div>
            <div className="flex justify-between text-2xl">
              <p>토요일</p>
              <p>
                {state.WD_OPER_BGNG_TM}~{state.WD_OPER_END_TM}
              </p>
            </div>
            <div className="flex justify-between text-2xl">
              <p>일요일/공휴일</p>
              <p>
                {state.LHLDY_OPER_BGNG_TM}~{state.LHLDY_OPER_END_TM}
              </p>
            </div>
          </div>
        ) : (
          <p>데이터를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
}
