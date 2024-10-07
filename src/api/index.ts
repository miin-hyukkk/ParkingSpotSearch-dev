import axios from "axios";
import ParkingDataRequest from "../interfaces/parkingDataRequest";

const loadParkingData = async ({ start, end, region }: ParkingDataRequest) => {
  try {
    const response = await axios.get(
      `/api/GetParkingInfo/${start}/${end}/${encodeURIComponent(region)}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching parking data:", error);
    throw error;
  }
};

export default loadParkingData;
