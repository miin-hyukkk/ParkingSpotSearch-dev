import { useEffect, useState } from "react";
import { SeoulDistrict } from "../interfaces/seoulDistrict";
import ICONS from "../constants/icon";

export default function useMap() {
  const [map, setMap] = useState<any>(null); // 지도 객체를 상태로 관리
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [currentDistrict, setCurrentDistrict] = useState<SeoulDistrict>(""); // 현재 자치구 정보 상태

  const updateDistrict = (center: any) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.coord2RegionCode(
      center.getLng(),
      center.getLat(),
      (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          // 자치구 정보를 찾고 `region_type`이 'H'인 경우 해당 정보를 상태에 저장
          const district = result.find((item: any) => item.region_type === "H");
          console.log(
            "result",
            result,
            [...district.address_name.split(" ")][1],
          );

          if (district)
            setCurrentDistrict([...district.address_name.split(" ")][1]);
        }
      },
    );
  };

  useEffect(() => {
    console.log("currentDistrict", currentDistrict);
  }, [currentDistrict]);

  useEffect(() => {
    const loadMap = (lat: number, lng: number) => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng), // 사용자의 현재 위치로 중심 좌표 설정
        level: 3,
      };
      const newMap = new window.kakao.maps.Map(container, options);
      setMap(newMap); // 지도 객체를 상태에 저장

      // 현재 위치에 마커 추가
      const markerPosition = new window.kakao.maps.LatLng(lat, lng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(newMap); // 마커를 지도에 표시

      // 지도 중심 좌표 변경 시 자치구 정보 업데이트
      window.kakao.maps.event.addListener(newMap, "center_changed", () => {
        const center = newMap.getCenter();
        updateDistrict(center); // 중심 좌표 변경 시 자치구 정보 업데이트
      });
    };

    // Geolocation API로 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude; // 위도
          const lng = position.coords.longitude; // 경도
          setCurrentPosition({ lat, lng }); // 현재 위치를 상태에 저장
          loadMap(lat, lng); // 지도를 현재 위치로 로드
        },
        error => {
          console.error("Geolocation error:", error);
          // 기본 위치로 지도 로드 (에러 발생 시)
          loadMap(33.450701, 126.570667);
        },
      );
    } else {
      // Geolocation을 지원하지 않을 경우 기본 위치로 지도 로드
      loadMap(33.450701, 126.570667);
    }
  }, []);

  // 버튼 클릭 시 현재 위치로 지도의 중심을 이동시키는 함수
  const moveToCurrentLocation = () => {
    if (map && currentPosition) {
      const moveLatLon = new window.kakao.maps.LatLng(
        currentPosition.lat,
        currentPosition.lng,
      );
      map.setCenter(moveLatLon); // 지도의 중심을 현재 위치로 이동
    }
  };

  // 지도 레벨 조절 함수 (줌 인/줌 아웃)
  const adjustZoomLevel = (delta: number) => {
    if (map) {
      let level = map.getLevel(); // 현재 지도의 레벨 가져오기
      level += delta; // 레벨을 변경 (+1 또는 -1)
      map.setLevel(level); // 변경된 레벨을 지도에 적용
    }
  };

  // 버튼 배열 정의
  const buttons = [
    {
      "aria-label": "Zoom In",
      className: `${ICONS.plus} bg-white text-black p-4 rounded-full shadow-lg text-4xl`,
      onClick: () => adjustZoomLevel(-1),
    },
    {
      "aria-label": "Zoom Out",
      className: `${ICONS.minus} bg-white text-black p-4 rounded-full shadow-lg text-4xl`,
      onClick: () => adjustZoomLevel(1),
    },
    {
      "aria-label": "현재 위치로 이동",
      className: `${ICONS.current_location} bg-white text-black p-4 rounded-full shadow-lg text-4xl`,
      onClick: moveToCurrentLocation,
    },
  ];
  return { buttons };
}
