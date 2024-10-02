import React from "react";
import useMap from "../../hooks/useMap";
import useFilter from "../../hooks/useFilter";

export default function Map() {
  const { buttons } = useMap();
  const { filterButtons } = useFilter();

  return (
    <div>
      <div
        id="map"
        className="relative h-full"
        style={{ width: "100%", height: "100vh" }}
      >
        {/* 필터 버튼들 */}
        <div className="absolute flex flex-row items-center justify-center space-x-4 top-8 left-12">
          {filterButtons.map(button => (
            <button
              onClick={button.onClick}
              type="button"
              className={button.className}
              aria-label={button["aria-label"]}
              style={{ zIndex: 10, width: "auto", height: "35px" }}
              key={button["aria-label"]}
            >
              <i
                className={`${button.iconClass} mr-2 pt-1`}
                style={{ fontSize: "13px" }}
              />
              <span className={`text-${button.isClicked ? "white" : "black"}`}>
                {button.label}
              </span>
            </button>
          ))}
        </div>
        {/* 줌 제어 및 현재 위치 버튼 */}
        <div className="absolute flex flex-col items-center space-y-4 bottom-20 right-12">
          {buttons.map(button => (
            <button
              onClick={button.onClick}
              type="button"
              className={button.className}
              aria-label={button["aria-label"]}
              style={{ zIndex: 10, width: "60px", height: "60px" }}
              key={button["aria-label"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
