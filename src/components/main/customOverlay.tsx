// CustomOverlay.tsx
import { useEffect, useState } from "react";
import { ParkingData } from "../../interfaces/parkingData";

interface CustomOverlayProps {
  map: any;
  modalData: ParkingData | null;
}

export default function CustomOverlay({ map, modalData }: CustomOverlayProps) {
  const [customOverlay, setCustomOverlay] = useState<any>(null);

  useEffect(() => {
    console.log("click", customOverlay);

    if (modalData && map) {
      const { LAT, LOT, ADDR, PRD_AMT, PRK_STTS_YN, PKLT_NM } = modalData;

      // 커스텀 오버레이 컨텐츠 설정
      const content = `
        <div class="customOverlayClass" style="position: relative; padding: 10px; width: 250px; font-size: 14px; background: white; border: 1px solid #ccc; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); border-radius: 10px;">
          <div style="display: flex; justify-content: space-between">
            <strong style="font-size: 16px; color: #0875F5">${PKLT_NM}</strong>
            <button id="bookmarkBtn" style="background: none; border: none; cursor: pointer;">⭐</button>
          </div>  
          <p>주소: ${ADDR}</p>
          <p style="color:#4395F6">현재 주차 가능: ${PRK_STTS_YN}대</p>
          <div style="display: flex; justify-content: space-between">
            <p>기본요금: ${PRD_AMT}원</p>
            <a href="#" style="color: blue;">상세보기</a>
          </div>
          <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-width: 10px; border-style: solid; border-color: white transparent transparent transparent;"></div>
        </div>
      `;

      const position = new window.kakao.maps.LatLng(LAT, LOT);
      console.log("존재유무 확인", customOverlay);

      // 기존 CustomOverlay 제거
      if (customOverlay) {
        console.log("기존  슛", customOverlay);
        customOverlay.setMap(null);
      }
      // 새로운 CustomOverlay 생성
      const newOverlay = new window.kakao.maps.CustomOverlay({
        position,
        content,
        xAnchor: 0.5,
        yAnchor: 1.4,
      });
      setCustomOverlay(newOverlay);
      console.log("click2", customOverlay);
      console.log("click2", customOverlay);

      newOverlay.setMap(map);
    }
  }, [modalData, map]);

  //   useEffect(() => {
  //     console.log("click3", customOverlay);
  //   }, [customOverlay]);
  // 외부 클릭 시 오버레이 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (customOverlay) {
        console.log("제발씨발");

        const overlayElement = document.querySelector(".customOverlayClass"); // 오버레이의 DOM 요소 클래스
        console.log("제발씨발3", overlayElement);

        if (overlayElement && !overlayElement.contains(event.target as Node)) {
          console.log("제발씨발2");

          customOverlay.setMap(null); // 외부 클릭 시 오버레이 닫기
          setCustomOverlay(null); // 상태 초기화
        }
      }
    };

    // 전역 클릭 이벤트 등록
    window.addEventListener("click", handleClickOutside);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener("click", handleClickOutside);
    };
  }, [customOverlay]);

  return null;
}
