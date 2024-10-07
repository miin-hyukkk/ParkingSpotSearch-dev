import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ICONS from "../constants/icon";
import useGuStore from "../store/gustore";
import loadParkingData from "../api";
import { ParkingData } from "../interfaces/parkingData";
import "@fortawesome/fontawesome-free/css/all.css";

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
  const navigate = useNavigate();

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
      const { LAT, LOT, ADDR, BSC_PRK_CRG, PKLT_NM, NOW_PRK_VHCL_CNT } =
        modalData;
      console.log("modalData", modalData);

      // 커스텀 오버레이 컨텐츠 설정
      const content = document.createElement("div");
      content.className = "customOverlayClass";
      content.style.cssText = `
        display: flex; 
        flex-direction: column; 
        gap: 1rem; 
        position: relative; 
        padding: 10px; 
        font-size: 14px; 
        background: white; 
        border: 1px solid #ccc; 
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
        border-radius: 10px; 
        z-index: 1000;
      `;

      content.innerHTML = `
        <div style="display: flex; justify-content: space-between; width: 100%; gap: 2rem">
          <strong style="font-size: 16px; color: #0875F5">${PKLT_NM}</strong>
          <i id="bookmark" class="bi bi-bookmark" style="background: none; border: none; cursor: pointer;"></i>
        </div>  
        <p>주소: ${ADDR}</p>
        <p style="color: #4395F6">현재 주차 가능: ${NOW_PRK_VHCL_CNT}대</p>
        <div style="display: flex; justify-content: space-between">
          <p>기본요금: ${BSC_PRK_CRG}원</p>
          <a href="#" style="color: blue;">상세보기</a>
        </div>
        <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-width: 10px; border-style: solid; border-color: white transparent transparent transparent;"></div>
      `;

      const detailLink = content.querySelector("a");
      if (detailLink) {
        detailLink.addEventListener("click", e => {
          e.preventDefault(); // 기본 동작(페이지 새로고침) 방지

          // 상세 페이지로 이동하며 데이터를 전달
          navigate(`/detail/${PKLT_NM}`, { state: modalData });
        });
      }

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

      // 오버레이가 설정된 후 북마크 버튼 이벤트 리스너 등록
      const bookmarkBtn = content.querySelector("#bookmark");

      // **초기 상태 설정: 로컬스토리지에 해당 주차장이 이미 존재하는 경우, 아이콘을 fill 상태로 설정**
      if (localStorage.getItem(PKLT_NM)) {
        bookmarkBtn?.classList.remove("bi-bookmark");
        bookmarkBtn?.classList.add("bi-bookmark-fill");
      }

      // 아이콘 버튼 상태에 따라 로컬스토리지 업데이트 및 아이콘 변경
      const handleBookmarkClick = (event: any) => {
        event.stopPropagation();
        const isBookmarked =
          bookmarkBtn?.classList.contains("bi-bookmark-fill");

        if (isBookmarked) {
          // 북마크가 이미 채워진 상태인 경우 -> 로컬스토리지에서 삭제
          bookmarkBtn?.classList.remove("bi-bookmark-fill");
          bookmarkBtn?.classList.add("bi-bookmark");
          localStorage.removeItem(PKLT_NM);
        } else {
          // 북마크가 비어 있는 상태인 경우 -> 로컬스토리지에 추가
          bookmarkBtn?.classList.remove("bi-bookmark");
          bookmarkBtn?.classList.add("bi-bookmark-fill");
          localStorage.setItem(
            PKLT_NM,
            JSON.stringify({ PKLT_NM, ADDR, NOW_PRK_VHCL_CNT, BSC_PRK_CRG }),
          );
        }
      };

      bookmarkBtn?.addEventListener("click", handleBookmarkClick);

      // cleanup function에서 이벤트 리스너 제거
      return () => {
        bookmarkBtn?.removeEventListener("click", handleBookmarkClick);
        newOverlay.setMap(null); // 오버레이 제거
        setCustomOverlay(null); // 상태 초기화
      };
    }
    return undefined;
  }, [modalData, map]);

  // 지도 클릭 이벤트로 오버레이를 닫는 로직 추가
  useEffect(() => {
    if (map) {
      const closeOverlayOnClick = (event: any) => {
        setTimeout(() => {
          // 지도 요소를 찾아서 지도 기준의 좌표를 브라우저 기준으로 변환
          const mapElement = document.querySelector(
            "#map",
          ) as HTMLElement | null; // 지도 요소의 ID가 'map'이라고 가정
          const overlayElement = document.querySelector(
            ".customOverlayClass",
          ) as HTMLElement | null;

          if (mapElement && overlayElement && event.point) {
            const mapRect = mapElement.getBoundingClientRect();
            const overlayRect = overlayElement.getBoundingClientRect();

            // event.point의 좌표를 브라우저 기준으로 변환
            const clickX = event.point.x + mapRect.left;
            const clickY = event.point.y + mapRect.top;

            // 변환된 좌표가 오버레이의 Bounding Rect 내에 있는지 확인
            if (
              clickX >= overlayRect.left &&
              clickX <= overlayRect.right &&
              clickY >= overlayRect.top &&
              clickY <= overlayRect.bottom
            ) {
              console.log("Clicked inside overlay");
              return; // 오버레이 내부 클릭 시 닫기 동작 방지
            }
          }

          // 오버레이 외부를 클릭했을 경우, 오버레이 닫기
          if (customOverlay) {
            console.log("Overlay closed");
            customOverlay.setMap(null); // 오버레이 지도에서 제거
            setCustomOverlay(null); // 상태 초기화
            setModalData(null); // 모달 데이터 초기화
          }
        }, 100); // 지연 시간 (100ms)
      };

      window.kakao.maps.event.addListener(map, "click", closeOverlayOnClick);

      return () => {
        window.kakao.maps.event.removeListener(
          map,
          "click",
          closeOverlayOnClick,
        );
      };
    }
    return undefined;
  }, [map, customOverlay]);
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
    // 기존 마커 제거
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
        // 동일한 마커를 다시 클릭한 경우, 오버레이 닫기
        if (modalData && modalData.LAT === LAT && modalData.LOT === LOT) {
          // 오버레이가 열려있으면 닫기
          if (customOverlay) {
            customOverlay.setMap(null); // 기존 오버레이 제거
            setCustomOverlay(null); // 오버레이 상태 초기화
            setModalData(null); // 모달 데이터 초기화
          } else {
            // 오버레이가 닫혀있으면 다시 열기
            setModalData(spot); // 모달 데이터 설정
          }
        } else {
          // 다른 마커를 클릭했을 경우
          if (customOverlay) {
            customOverlay.setMap(null); // 이전 오버레이 제거
            setCustomOverlay(null); // 오버레이 상태 초기화
          }
          setModalData(spot); // 새로운 모달 데이터 설정
        }
      });

      return marker;
    });

    setMarkers(newMarkers);
  };

  useEffect(() => {
    if (currentDistrict) {
      fetchParkingData(currentDistrict);
    }
  }, [currentDistrict]);

  useEffect(() => {
    if (parkingData.length > 0) {
      addMarkersToMap(parkingData);
    }
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

  const [originalData, setOriginalData] = useState<ParkingData[]>([]); // 초기 데이터 저장
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]); // 선택된 필터 상태 관리

  // 최초로 데이터를 가져올 때 원본 데이터를 저장해두는 로직
  if (originalData.length === 0 && parkingData.length > 0) {
    setOriginalData(parkingData); // parkingData가 로드되면 원본 데이터를 저장
  }

  const filterParkingData = (filterType: string) => {
    let newSelectedFilters = [...selectedFilters];
    // 배타적인 필터 조합을 관리하는 로직
    const mutuallyExclusivePairs: Record<string, string[]> = {
      유료: ["무료"],
      무료: ["유료"],
      노상: ["노외"],
      노외: ["노상"],
    };
    // 선택한 필터가 이미 있는 경우 (클릭을 해제하는 경우)
    if (newSelectedFilters.includes(filterType)) {
      newSelectedFilters = newSelectedFilters.filter(
        filter => filter !== filterType,
      );
    } else {
      // 선택한 필터가 없는 경우 추가하고, 배타적 필터를 해제
      newSelectedFilters.push(filterType);
      const mutuallyExclusiveFilters = mutuallyExclusivePairs[filterType] || [];

      // 배타적인 필터가 선택된 경우 이를 해제
      newSelectedFilters = newSelectedFilters.filter(
        filter => !mutuallyExclusiveFilters.includes(filter),
      );
    }
    setSelectedFilters(newSelectedFilters); // 선택된 필터 상태 업데이트

    // 필터가 선택되지 않은 경우 원본 데이터로 복구
    if (newSelectedFilters.length === 0) {
      setParkingData(originalData);
      return;
    }

    // 선택된 필터에 따라 데이터를 필터링
    let filteredData = originalData;

    if (newSelectedFilters.includes("유료")) {
      filteredData = filteredData.filter(
        data => data.LHLDY_CHGD_FREE_SE_NAME === "유료",
      );
    }
    if (newSelectedFilters.includes("무료")) {
      filteredData = filteredData.filter(
        data => data.LHLDY_CHGD_FREE_SE_NAME === "무료",
      );
    }
    if (newSelectedFilters.includes("노상")) {
      filteredData = filteredData.filter(
        data => data.PRK_TYPE_NM === "노상 주차장",
      );
    }
    if (newSelectedFilters.includes("노외")) {
      filteredData = filteredData.filter(
        data => data.PRK_TYPE_NM === "노외 주차장",
      );
    }
    if (newSelectedFilters.includes("현재 주차 가능")) {
      filteredData = filteredData.filter(
        data => data.NOW_PRK_VHCL_CNT < data.TPKCT,
      );
    }

    setParkingData(filteredData); // 필터링된 데이터 설정
  };

  // 필터 버튼 업데이트
  const filterButtons = [
    {
      "aria-label": "유료",
      className: `px-6 rounded-full shadow-lg flex items-center text-lg ${
        selectedFilters.includes("유료")
          ? "bg-filter_yellow text-white"
          : "bg-white text-filter_yellow"
      }`,
      iconClass: ICONS.won,
      label: "유료",
      onClick: () => filterParkingData("유료"),
      isClicked: !!selectedFilters.includes("유료"),
    },
    {
      "aria-label": "무료",
      className: `px-6 rounded-full shadow-lg flex items-center text-lg ${
        selectedFilters.includes("무료")
          ? "bg-primary text-white"
          : "bg-white text-primary"
      }`,
      iconClass: ICONS.won,
      label: "무료",
      onClick: () => filterParkingData("무료"),
      isClicked: !!selectedFilters.includes("무료"),
    },
    {
      "aria-label": "노상",
      className: `px-6 rounded-full shadow-lg flex items-center text-lg ${
        selectedFilters.includes("노상")
          ? "bg-filter_green text-white"
          : "bg-white text-filter_green"
      }`,
      iconClass: ICONS.road_solid,
      label: "노상",
      onClick: () => filterParkingData("노상"),
      isClicked: !!selectedFilters.includes("노상"),
    },
    {
      "aria-label": "노외",
      className: `px-6 rounded-full shadow-lg flex items-center text-lg ${
        selectedFilters.includes("노외")
          ? "bg-filter_dark_green text-white"
          : "bg-white text-filter_dark_green"
      }`,
      iconClass: ICONS.ruler_solid,
      label: "노외",
      onClick: () => filterParkingData("노외"),
      isClicked: !!selectedFilters.includes("노외"),
    },
    {
      "aria-label": "현재 주차 가능",
      className: `px-6 rounded-full shadow-lg flex items-center text-lg ${
        selectedFilters.includes("현재 주차 가능")
          ? "bg-filter_blue text-white"
          : "bg-white text-filter_blue"
      }`,
      iconClass: ICONS.car,
      label: "현재 주차 가능",
      onClick: () => filterParkingData("현재 주차 가능"),
      isClicked: !!selectedFilters.includes("현재 주차 가능"),
    },
  ];

  return {
    buttons,
    parkingData,
    setParkingData,
    modalData,
    setModalData,
    filterButtons,
    customOverlay,
    setCustomOverlay,
  };
}
