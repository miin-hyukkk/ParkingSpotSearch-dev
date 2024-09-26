import React from "react";
import ICONS from "../../constants/icon";

interface InputProps {
  onInputChange: (inputValue: string) => void; // 부모 컴포넌트에서 전달된 함수
  value: string; // 현재 입력된 값
}

export default function Input({ onInputChange, value }: InputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value; // 입력된 값을 문자열로 가져옴
    onInputChange(inputValue); // 부모 컴포넌트에 전달
  };

  return (
    <div className="flex w-full gap-6 p-4 border border-blue-500 rounded-lg">
      <i className={`${ICONS.search} text-blue-500 text-2xl`} />
      <input
        className="w-full border-0 focus:outline-none"
        type="text"
        placeholder="자치구를 입력해주세요 (예) 강남구, 도봉구."
        value={value} // 현재 입력값 설정
        onChange={handleChange}
      />
    </div>
  );
}
