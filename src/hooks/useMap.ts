import { useEffect, useState } from "react";
import ICONS from "../constants/icon";
import useGuStore from "../store/gustore";
import loadParkingData from "../api";
import { ParkingData } from "../interfaces/parkingData";

export default function useMap() {
  const [map, setMap] = useState<any>(null);
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [customOverlay, setCustomOverlay] = useState<any>(null); // CustomOverlay 상태 추가
  const [modalData, setModalData] = useState<ParkingData | null>(null);

  const { currentDistrict, setCurrentDistrict } = useGuStore();
  const [parkingData, setParkingData] = useState<ParkingData[]>([]);

  const updateDistrict = (center: any) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2RegionCode(
      center.getLng(),
      center.getLat(),
      (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const district = result.find((item: any) => item.region_type === "H");
          if (district)
            setCurrentDistrict([...district.address_name.split(" ")][1]);
        }
      },
    );
  };

  // 지도 초기화 및 CustomOverlay 생성
  useEffect(() => {
    const loadMap = (lat: number, lng: number) => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 5,
      };
      const newMap = new window.kakao.maps.Map(container, options);
      setMap(newMap);

      const currentPositionMarkerImageSrc = "/current.png";
      const currentPositionMarkerSize = new window.kakao.maps.Size(100, 40);
      const currentPositionMarkerOption = {
        offset: new window.kakao.maps.Point(25, 50),
      };

      const currentPositionMarkerImage = new window.kakao.maps.MarkerImage(
        currentPositionMarkerImageSrc,
        currentPositionMarkerSize,
        currentPositionMarkerOption,
      );

      const markerPosition = new window.kakao.maps.LatLng(lat, lng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: currentPositionMarkerImage,
      });

      marker.setMap(newMap);
      updateDistrict(newMap.getCenter());

      window.kakao.maps.event.addListener(newMap, "center_changed", () => {
        const center = newMap.getCenter();
        updateDistrict(center);
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCurrentPosition({ lat, lng });
          loadMap(lat, lng);
        },
        error => {
          console.error("Geolocation error:", error);
          loadMap(33.450701, 126.570667);
        },
      );
    } else {
      loadMap(33.450701, 126.570667);
    }
  }, []);

  // 모달 데이터 변경 시 CustomOverlay 업데이트
  useEffect(() => {
    if (modalData && map) {
      const { LAT, LOT, ADDR, PRD_AMT, PRK_STTS_YN, PKLT_NM } = modalData;

      // 커스텀 오버레이 컨텐츠 설정
      const content = `
      <div style="position: relative; padding: 10px; width: 250px; font-size: 14px; background: white; border: 1px solid #ccc; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); border-radius: 4px;">
        <strong style="font-size: 16px;">${PKLT_NM}</strong><br/>
        주소: ${ADDR}<br/>
        현재 주차 가능: ${PRK_STTS_YN}대<br/>
        기본요금: ${PRD_AMT}원<br/>
        <a href="#" style="color: blue;">상세보기</a>
        <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-width: 10px; border-style: solid; border-color: white transparent transparent transparent;"></div>
      </div>
    `;

      const position = new window.kakao.maps.LatLng(LAT, LOT);

      // 기존 CustomOverlay 제거
      if (customOverlay) {
        customOverlay.setMap(null);
      }

      // 새로운 CustomOverlay 생성
      const newOverlay = new window.kakao.maps.CustomOverlay({
        position,
        content,
        xAnchor: 0.5,
        yAnchor: 1.4,
      });

      newOverlay.setMap(map);

      setCustomOverlay(newOverlay);
    }
  }, [modalData, map]);

  const fetchParkingData = async (district: string) => {
    const requestData = {
      start: 1,
      end: 999,
      region: district,
    };

    try {
      const data = await loadParkingData(requestData);
      const newParkingData = data?.GetParkingInfo?.row || [];
      setParkingData(newParkingData);
    } catch (error) {
      console.error("주차장 데이터 로딩 중 오류 발생:", error);
    }
  };

  const addMarkersToMap = (parkingSpots: any[]) => {
    if (!map) return;

    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    const newMarkers = parkingSpots.map(spot => {
      const { LAT, LOT } = spot;
      const markerPosition = new window.kakao.maps.LatLng(LAT, LOT);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);

      // 마커 클릭 이벤트 추가
      window.kakao.maps.event.addListener(marker, "click", () => {
        setModalData(spot); // 마커 클릭 시 모달 데이터 설정
      });

      return marker;
    });

    setMarkers(newMarkers);
  };

  useEffect(() => {
    if (currentDistrict) {
      setParkingData([]);
      fetchParkingData(currentDistrict);
    }
  }, [currentDistrict]);

  useEffect(() => {
    addMarkersToMap(parkingData);
  }, [parkingData]);

  const moveToCurrentLocation = () => {
    if (map && currentPosition) {
      const moveLatLon = new window.kakao.maps.LatLng(
        currentPosition.lat,
        currentPosition.lng,
      );
      map.setCenter(moveLatLon);
    }
  };

  const adjustZoomLevel = (delta: number) => {
    if (map) {
      let level = map.getLevel();
      level += delta;
      map.setLevel(level);
    }
  };

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

  return { buttons, parkingData, setParkingData, modalData, setModalData };
}
