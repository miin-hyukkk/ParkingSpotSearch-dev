import React from "react";
import useMap from "../../hooks/useMap";

export default function Map() {
  const { buttons } = useMap();

  return (
    <div>
      <div
        id="map"
        className="relative h-full"
        style={{ width: "100%", height: "100vh" }}
      >
        <div className="absolute flex flex-col items-center space-y-4 bottom-20 right-12">
          {buttons.map(button => (
            <button
              onClick={button.onClick}
              type="button"
              className={button.className}
              aria-label={button["aria-label"]}
              style={{ zIndex: 10, width: "60px", height: "60px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
