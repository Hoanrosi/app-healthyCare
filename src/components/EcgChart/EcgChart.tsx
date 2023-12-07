import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

import { ref, getDatabase } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

import firebaseApp from "../../firebase";
const database = getDatabase(firebaseApp);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EcgChart: React.FC = () => {
  const [snapshots] = useObject(ref(database, "informationSensor"));
  const [labels, setLabels] = useState<string[]>([""]);
  const [heartBeatValues, setHeartBeatValues] = useState<number[]>([]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString();
  };
  useEffect(() => {
    if (snapshots) {
      const sensorData = snapshots.val().valueHeartBeat;
      const heartBeatValue: number[] = Object.values(sensorData).map(
        (data) => data.valueHeartBeat
      );
      setHeartBeatValues(heartBeatValue);
    }
    // if (snapshots) {
    //   setHeartBeatValues(snapshots?.val().valueHeartBeat);
    //   console.log("heartBeatValues:>>", heartBeatValues);
    // }
  }, [snapshots]);

  useEffect(() => {
    // Update labels every second, limit to 20 times
    const interval = setInterval(() => {
      setLabels((prevLabels) => {
        const newLabels = [...prevLabels, getCurrentTime()];
        return newLabels.length > 5 ? newLabels.slice(1) : newLabels;
      });

      // setHeartBeatValues((prevValues) => [
      //   ...prevValues.slice(1),
      //   newHeartBeatValue,
      // ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Heart Beat",
        data: heartBeatValues,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "ECG",
        data: labels.map(() => faker.number.int({ min: 50, max: 100 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default EcgChart;
