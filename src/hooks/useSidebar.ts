import { useState, useCallback, useEffect, useRef } from "react";
import { throttle } from "lodash";
import { SeoulDistrict } from "../interfaces/seoulDistrict";
import { ParkingData } from "../interfaces/parkingData";
import ParkingDataRequest from "../interfaces/parkingDataRequest";
import loadParkingData from "../api";
import seoulDistricts from "../constants/seoulDistricts";

export default function useSidebar() {
  const [inputValue, setInputValue] = useState<string>("");
  const [region, setRegion] = useState<SeoulDistrict>(""); // 초기값을 빈 문자열로 설정
  const [parkingData, setParkingData] = useState<ParkingData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 추가
  const scrollableRef = useRef<HTMLDivElement | null>(null); // 사이드바 스크롤 영역 참조

  // 주차장 데이터를 가져오는 함수
  const fetchParkingData = async (input: SeoulDistrict, page: number) => {
    if (!input || isLoading) return; // 입력 값이 없거나 로딩 중이면 요청하지 않음

    const requestData: ParkingDataRequest = {
      start: (page - 1) * 10 + 1,
      end: page * 10,
      region: input,
    };

    setIsLoading(true); // 로딩 시작
    try {
      const data = await loadParkingData(requestData);
      setParkingData(prev => [...prev, ...(data?.GetParkingInfo?.row || [])]); // 데이터를 추가
      setTotalPages(Math.ceil(data.GetParkingInfo.list_total_count / 10)); // 총 페이지 수 계산
    } catch (error) {
      console.error("주차장 데이터 로딩 중 오류 발생:", error);
    } finally {
      setIsLoading(false); // 로딩 끝
    }
  };

  // 데이터를 가져오는 함수에 throttle 적용 (최신 currentPage 사용)
  const throttledFetchParkingData = useCallback(
    throttle((region_: SeoulDistrict, page: number) => {
      fetchParkingData(region_, page);
    }, 2000),
    [],
  );

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (seoulDistricts.includes(value as SeoulDistrict)) {
      setRegion(value as SeoulDistrict);
      setParkingData([]); // 데이터 초기화
      setCurrentPage(1); // 페이지 초기화
      throttledFetchParkingData(value as SeoulDistrict, 1); // 첫 페이지 데이터 불러오기
    } else {
      setRegion(""); // 유효하지 않은 경우 region을 빈 문자열로 설정
    }
  };

  const handleScroll = useCallback(
    throttle(() => {
      if (!scrollableRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 50; // 약간의 여유를 두고 체크

      if (isAtBottom && currentPage < totalPages && !isLoading) {
        setCurrentPage(prev => prev + 1); // 페이지 증가
      }
    }, 300),
    [currentPage, totalPages, isLoading],
  );
  // 페이지가 변경될 때 데이터를 불러오는 useEffect
  useEffect(() => {
    if (region && currentPage > 1) {
      throttledFetchParkingData(region, currentPage); // 페이지 업데이트 시 데이터 로드
    }
  }, [currentPage, region, throttledFetchParkingData]); // 페이지와 지역이 업데이트될 때마다 호출

  // 사이드바 스크롤 이벤트 등록
  useEffect(() => {
    const scrollableElement = scrollableRef.current;
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return {
    region,
    handleInputChange,
    inputValue,
    parkingData,
    isLoading,
    scrollableRef,
  };
}
