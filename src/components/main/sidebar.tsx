import React, { useState, useCallback } from "react";
import { throttle } from "lodash";
import Header from "../layout/header";
import Input from "../common/input";
import loadParkingData from "../../api";
import ParkingDataRequest from "../../interfaces/parkingDataRequest";
import { SeoulDistrict } from "../../interfaces/seoulDistrict";
import seoulDistricts from "../../constants/seoulDistricts";

export default function Sidebar() {
  const [inputValue, setInputValue] = useState<string>(""); // 입력 값 상태
  const [region, setRegion] = useState<SeoulDistrict>("송파구");
  const [parkingData, setParkingData] = useState([]);

  const throttledFetchParkingData = useCallback(
    throttle(async (input: SeoulDistrict) => {
      const requestData: ParkingDataRequest = {
        start: 1,
        end: 100,
        region: input,
      };
      const data = await loadParkingData(requestData);
      setParkingData(data?.GetParkingInfo?.row || []);
    }, 2000), // 2초 쓰로틀링
    [],
  );

  const handleInputChange = (value: string) => {
    setInputValue(value); // 입력된 값을 상태에 저장
    // 입력값이 SeoulDistrict에 존재하는지 체크
    if (seoulDistricts.includes(value as SeoulDistrict)) {
      throttledFetchParkingData(value as SeoulDistrict); // 유효한 경우에만 API 호출
      setRegion(value as SeoulDistrict); // 유효한 경우에만 region 업데이트
    }
  };

  console.log(region);
  console.log(parkingData);

  return (
    <div className="h-full">
      <Header />
      <Input onInputChange={handleInputChange} value={inputValue} />
      <h1 className="py-8 text-4xl">{region} 근처 주차장이에요.</h1>
      {/* <List parkingData={parkingData} /> */}
    </div>
  );
}
