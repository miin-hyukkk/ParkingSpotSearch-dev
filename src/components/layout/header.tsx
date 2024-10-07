import React from "react";
import ICONS from "../../constants/icon";
import "bootstrap-icons/font/bootstrap-icons.css";

interface HeaderProps {
  isBookmarked: boolean; // isBookmarked는 boolean 타입
  toggleBookmark: () => void; // toggleBookmark는 리턴값이 없는 함수 타입
}

export default function Header({ isBookmarked, toggleBookmark }: HeaderProps) {
  return (
    <div className="relative flex items-center px-6 mb-10 gap-9">
      <i
        className={`${ICONS.logo} text-primary`}
        style={{ fontSize: "5rem" }}
      />
      <div className="text-5xl font-bold text-gray">주차자리요</div>
      {/* 아이콘 클릭 시 `toggleBookmark` 함수 호출 */}
      <i
        className={`absolute right-0 pr-4 text-2xl cursor-pointer ${
          isBookmarked ? ICONS.bookmark_fill : ICONS.bookmark
        } text-gray`}
        onClick={toggleBookmark}
        role="button"
        tabIndex={0} // 키보드 포커스를 받을 수 있도록 설정
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            // Enter 또는 Space 키 입력 시 클릭 이벤트처럼 동작
            e.preventDefault(); // Space 키의 기본 스크롤 동작을 방지
            toggleBookmark();
          }
        }}
        aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"} // 컨트롤에 대한 설명 추가
      />
    </div>
  );
}
