import React, { useState, useCallback } from "react";
import { throttle } from "lodash";
import Header from "../layout/header";
import Input from "../common/input";
import loadParkingData from "../../api";
import ParkingDataRequest from "../../interfaces/parkingDataRequest";

export default function Sidebar() {
  const [region, setRegion] = useState("");
  const [parkingData, setParkingData] = useState([]);

  const throttledFetchParkingData = useCallback(
    throttle(async (inputValue: string) => {
      const requestData: ParkingDataRequest = {
        start: 1,
        end: 100,
        region: inputValue,
      };
      const data = await loadParkingData(requestData);
      setParkingData(data?.GetParkingInfo?.row || []);
    }, 2000), // 2초 쓰로틀링
    [],
  );

  const handleInputChange = (inputValue: string) => {
    setRegion(inputValue);
    if (inputValue.length >= 2) {
      throttledFetchParkingData(inputValue); // 2초에 한 번씩 API 호출
    } else {
      setParkingData([]);
    }
  };

  console.log(region);
  console.log(parkingData);

  return (
    <div className="h-full">
      <Header />
      <Input onInputChange={handleInputChange} />
      <h1 className="py-8 text-4xl">송파구 근처 주차장이에요.</h1>
      {/* <List parkingData={parkingData} /> */}
    </div>
  );
}
