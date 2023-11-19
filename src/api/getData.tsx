import axios, { AxiosResponse } from "axios";

interface HealthData {
  valueAirQuality: number;
  valueEcg: number;
  valueHeartBeat: number;
  valueLatitude: number;
  valueLongitude: number;
  valueOxygenBoold: number;
  valueTemperature: number;
}
const getData = async (): Promise<HealthData | null> => {
  try {
    const response: AxiosResponse<HealthData> = await axios.get(
      "http://localhost:3000/getdata"
    );
    const result: HealthData = response.data;

    console.log("Fetched data:", result);

    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default getData;
