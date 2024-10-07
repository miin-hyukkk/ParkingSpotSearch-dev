import axios from "axios";
import ParkingDataRequest from "../interfaces/parkingDataRequest";

const loadParkingData = async ({ start, end, region }: ParkingDataRequest) => {
  const apiKey = process.env.REACT_APP_SEOUL_API_KEY; // 환경 변수에서 API 키 가져오기

  // API URL 설정: 로컬 개발 환경과 Vercel 배포 환경 구분
  const apiUrl =
    process.env.NODE_ENV === "development" // 개발 환경
      ? `http://openapi.seoul.go.kr:8088/${apiKey}/json/GetParkingInfo/${start}/${end}/${encodeURIComponent(region)}` // 로컬 환경에서 요청
      : `/api/GetParkingInfo/${start}/${end}/${encodeURIComponent(region)}`; // Vercel 환경에서는 프록시된 /api 경로 사용

  try {
    const response = await axios.get(apiUrl); // 설정된 API URL로 요청
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error fetching parking data:", error); // 오류 로그 출력
    throw error; // 오류 재발생
  }
};

export default loadParkingData;
