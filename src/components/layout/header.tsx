import React from "react";
import ICONS from "../../constants/icon";

export default function Header() {
  return (
    <div className="relative flex items-center mb-10 gap-9">
      <i
        className={`${ICONS.logo} text-primary`}
        style={{ fontSize: "5rem" }}
      />
      <div className="text-5xl font-bold text-gray">주차자리요</div>
      <i
        className={`${ICONS.bookmark} absolute right-0 pr-4 text-2xl text-gray`}
      />
    </div>
  );
}
