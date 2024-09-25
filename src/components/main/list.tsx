import React from "react";

export default function List() {
  return (
    <div className="flex flex-col gap-5 pt-6 border-t border-gray-300 border-t-1">
      <p className="text-4xl font-light text-secondary">주차장 이름</p>
      <p className="text-gray">주소 / 노상 / 기본요금 </p>
      <p className="font-light text-secondary">상세보기</p>
    </div>
  );
}
