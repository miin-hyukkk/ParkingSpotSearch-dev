import { useState } from "react";
import ICONS from "../constants/icon";
import "@fortawesome/fontawesome-free/css/all.css";
import useMap from "./useMap";
import { ParkingData } from "../interfaces/parkingData";

export default function useFilter() {
  const { parkingData, setParkingData } = useMap();
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
  return { filterButtons, filterParkingData };
}
