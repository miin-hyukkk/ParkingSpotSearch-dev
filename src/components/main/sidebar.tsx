import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "../layout/header";
import Input from "../common/input";
import loadParkingData from "../../api";
import ParkingDataRequest from "../../interfaces/parkingDataRequest";
// import List from "./list";

export default function Sidebar() {
  const [region, setRegion] = useState(""); // 입력된 자치구를 저장할 상태
  const [parkingData, setParkingData] = useState([]); // 주차장 데이터를 저장할 상태

  // 자치구 입력 후 데이터 가져오는 함수
  const handleInputChange = async (inputValue: string) => {
    setRegion(inputValue); // 입력된 자치구를 상태에 저장
    const requestData: ParkingDataRequest = {
      start: 1,
      end: 100,
      region: inputValue, // regionData를 넘겨줌
    };
    // 실제 데이터 fetching 로직을 여기에 추가
    if (inputValue.length >= 2) {
      const data = await loadParkingData(requestData); // fetchParkingData는 예시 함수
      setParkingData(data?.GetParkingInfo?.row);
    } else {
      setParkingData([]);
    }
  };

  console.log("region", region);
  console.log("parkingData", parkingData);

  return (
    <div className="h-full">
      <Header />
      <Input onInputChange={handleInputChange} /> {/* 콜백 함수 전달 */}
      <h1 className="py-8 text-4xl">송파구 근처 주차장이에요.</h1>
      {/* <List parkingData={parkingData} /> */}
    </div>
  );
}
