import axios from "axios";
import ParkingDataRequest from "../interfaces/parkingDataRequest";

const loadParkingData = async ({ start, end, region }: ParkingDataRequest) => {
  const apiKey = process.env.REACT_APP_SEOUL_API_KEY;
  try {
    const response = await axios.get(
      `http://openapi.seoul.go.kr:8088/${apiKey}/json/GetParkingInfo/${start}/${end}/${encodeURIComponent(region)}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching parking data:", error);
    throw error;
  }
};
export default loadParkingData;
