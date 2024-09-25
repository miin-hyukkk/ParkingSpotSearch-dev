import React from "react";
import ICONS from "../../constants/icon";

interface InputProps {
  onInputChange: (inputValue: string) => void; // 부모 컴포넌트에서 전달된 함수
}

export default function Input({ onInputChange }: InputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // 입력 값이 2자 이상일 때만 부모에게 전달
    if (inputValue.length >= 2) {
      onInputChange(inputValue);
    } else {
      onInputChange(""); // 입력이 2자 미만일 경우 빈 문자열 전달
    }
  };

  return (
    <div className="flex w-full gap-6 p-4 border border-blue-500 rounded-lg ">
      <i className={`${ICONS.search} text-blue-500 text-2xl`} />
      <input
        className="w-full border-0 focus:outline-none"
        type="text"
        placeholder="자치구를 입력해주세요 (예) 강남구, 도봉구."
        onChange={handleChange}
      />
    </div>
  );
}
