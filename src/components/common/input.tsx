import React from "react";
import ICONS from "../../constants/icon";

export default function Input() {
  return (
    <div className="flex w-full gap-6 p-4 border border-blue-500 rounded-lg ">
      <i className={`${ICONS.search} text-blue-500 text-2xl`} />
      <input
        className="w-full border-0 focus:outline-none"
        type="text"
        placeholder="자치구를 입력해주세요 (예) 강남구,도봉구."
      />
    </div>
  );
}
