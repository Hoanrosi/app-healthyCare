import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import icon_home from "../../components/image/icon-home.png";
import icon_logo from "../../components/image/logo.png";
import icon_calendar from "../../components/image/icon-calendar.png";
import icon_map from "../../components/image/icon-map.png";
import icon_message from "../../components/image/icon-message.png";
import icon_profile from "../../components/image/icon-profile.png";
import icon_search from "../../components/image/icon-search.png";
import icon_annount from "../../components/image/icon-annount.png";
import icon_heart_beat from "../../components/image/icon-heart-beat.png";
import icon_spo2 from "../../components/image/icon-Spo2.png";
import icon_temperature from "../../components/image/icon_temperature.png";
import icon_air from "../../components/image/icon-air.jpg";
import icon_meansure_height from "../../components/image/icon-measure-height.png";
import icon_ecg from "../../components/image/icon_ecg.png";
import icon_meansure_weight from "../../components/image/icon-measure-weight.png";
import icon_warter from "../../components/image/icon_warter.png";
import icon_heart from "../../components/image/icon-heart.png";
import Donut from "../../components/DoughnutChart/DoughnutChart";
import EcgChart from "../../components/EcgChart/EcgChart";
import Calendar from "../../components/Calendar/Calendar";
import Logout from "../../features/Logout/Logout";
// import SimpleMap from "../../components/GoogleMap/GooleMap";
// import GooleMap from "../../components/GoogleMap/GooleMap";
import MapContainer from "../../components/GoogleMap/GooleMap";
import getData from "../../api/getData";
import axios from "axios";
import "./home.scss";
// import { message } from "antd";

import { ref, getDatabase } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import firebaseApp from "../../firebase";
import warning from "antd/es/_util/warning";

const database = getDatabase(firebaseApp);

const Home: React.FC = () => {
  const [healthData, setHealthData] = useState<any>();
  const [dataInfor, setDataInfor] = useState<array>();
  const [showWarning, setShowWarning] = useState(false);
  const [totalWarning, setTotalWarning] = useState<number>();
  const [warningMessages, setWarningMessages] = useState<string[]>([]);
  const [lastValue, setLastValue] = useState<number | null>(undefined);

  const [snapshots] = useObject(ref(database, "informationSensor"));
  const latitude = 20.980863410602836;
  const longitude = 105.78748081031507;
  // const fetchData = async () => {
  const fetchData = async () => {
    try {
      const result = await getData();
      if (result) {
        setHealthData(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleWarningClick = () => {
    setShowWarning(!showWarning);
  };

  useEffect(() => {
    if (snapshots) {
      console.log(snapshots.val());
      const informationSensor = snapshots.val();
      const heartBeatValues = informationSensor
        ? Object.values(informationSensor.valueHeartBeat)
        : [];
      let warnings = 0;
      const messages: string[] = [];
      if (heartBeatValues.length > 0) {
        const lastHeartBeatValue: number = heartBeatValues[
          heartBeatValues.length - 1
        ] as number;
        setLastValue(lastHeartBeatValue);
        if (lastHeartBeatValue < 60 || lastHeartBeatValue > 120) {
          warnings += 1;
          messages.push("Heart beat faster than normal!");
        }
      }

      if (snapshots.val().valueOxygenBlood < 90) {
        warnings += 1;
        messages.push("Cảnh báo!!! oxy trong máu cực thấp cần cấp cứu");
      } else if (
        90 <= snapshots.val().valueOxygenBlood &&
        snapshots.val().valueOxygenBlood < 93
      ) {
        warnings += 1;
        messages.push("Cảnh báo!!! oxy trong máu thấp cần theo dõi");
      } else if (
        93 <= snapshots.val().valueOxygenBlood &&
        snapshots.val().valueOxygenBlood < 96
      ) {
        warnings += 1;
        messages.push("Cảnh báo!!! oxy trong máu trung bình");
      }

      setTotalWarning(warnings);
      setWarningMessages(messages);
    }
  }, [snapshots]);
  // useEffect(() => {
  //   console.log("useEffectt call");
  //   fetchData();
  //   if (healthData) {
  //     let warnings = 0;
  //     let messages: string[] = [];
  //     if (
  //       healthData.valueHeartBeat !== undefined &&
  //       (healthData.valueHeartBeat < 60 || healthData.valueHeartBeat > 120)
  //     ) {
  //       warnings += 1;
  //       if (healthData.valueHeartBeat > 120) {
  //         messages.push("Heart beat faster than normal!");
  //       } else if (healthData.valueHeartBeat < 60) {
  //         messages.push(
  //           "A heartbeat that is slower than normal is a warning sign of danger!"
  //         );
  //       }
  //     }

  //     // Check valueOxygenBlood
  //     if (
  //       healthData.valueOxygenBlood !== undefined &&
  //       healthData.valueOxygenBlood < 92
  //     ) {
  //       warnings += 1;
  //       messages.push("Low blood oxygen level detected!");
  //     }

  //     setTotalWarning(warnings);
  //     setWarningMessages(messages);
  //   }
  // }, []);

  const fetchDataInfor = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getinformations");
      console.log(response.data);
      setDataInfor(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataInfor();
  }, []);

  const weight =
    dataInfor && dataInfor.length > 0 && dataInfor[0].weight !== undefined
      ? dataInfor[0].weight
      : "";
  const height =
    dataInfor && dataInfor.length > 0 && dataInfor[0].height !== undefined
      ? dataInfor[0].height
      : "";

  const bmi = parseFloat(
    (weight / (height * height * Math.pow(10, -4))).toFixed(2)
  );
  console.log("BMI:", bmi);

  console.log(weight, "weight");
  console.log("healthData:>>", healthData);

  console.log("init");
  return (
    <div className="home-layout">
      <div className="home-container">
        <div className="home-sidebar">
          <div className="home-sidebar-logo">
            <img src={icon_logo} className="icon-logo" />
          </div>
          <div className="home-sidebar-features">
            <Link to="">
              <img src={icon_home} className="icon-sidebar" />
            </Link>
            <Link to="">
              <img src={icon_calendar} className="icon-sidebar" />
            </Link>
            <Link to="">
              <img src={icon_message} className="icon-sidebar" />
            </Link>
            <Link to="/map">
              <img src={icon_map} className="icon-sidebar" />
            </Link>
            <Link to="/profile">
              <img src={icon_profile} className="icon-sidebar" />
            </Link>
            <Logout />
          </div>
        </div>
        <div className="home-content">
          <div className="home-content-survival-index">
            <div className="home-content-survival-header">
              <div className="home-content-survival-heading">
                Health Overview
              </div>
              <div className="home-content-survival-feature">
                <div className="home-content-survial-filter">
                  <img src={icon_search} className="icon-feature" />
                </div>
                <div className="home-content-survial-filter">
                  <div className="warning-message" onClick={handleWarningClick}>
                    {totalWarning}
                  </div>
                  {showWarning && (
                    <div
                      className="show-massage-warning"
                      onClick={handleWarningClick}
                    >
                      <div className="show-massage-warning-list ">
                        {warningMessages.map((message, index) => (
                          <div
                            className="show-massage-warning-item"
                            key={index}
                          >
                            <div className="show-massage-warning-title">
                              <div className="image-icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433284 8.00042 -0.1937 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9949 7.34939 18.9397 4.80881 17.0655 2.93455C15.1912 1.06028 12.6506 0.00508267 10 0ZM13.625 12.5288C13.7694 12.6747 13.8505 12.8717 13.8505 13.0769C13.8505 13.2822 13.7694 13.4792 13.625 13.625C13.478 13.7672 13.2814 13.8466 13.0769 13.8466C12.8724 13.8466 12.6759 13.7672 12.5288 13.625L10 11.0865L7.47116 13.625C7.32413 13.7672 7.1276 13.8466 6.92308 13.8466C6.71856 13.8466 6.52203 13.7672 6.375 13.625C6.23056 13.4792 6.14952 13.2822 6.14952 13.0769C6.14952 12.8717 6.23056 12.6747 6.375 12.5288L8.91346 10L6.375 7.47115C6.25234 7.32169 6.18965 7.13195 6.19914 6.93884C6.20862 6.74572 6.2896 6.56303 6.42632 6.42631C6.56304 6.2896 6.74572 6.20862 6.93884 6.19913C7.13196 6.18965 7.3217 6.25234 7.47116 6.375L10 8.91346L12.5288 6.375C12.6783 6.25234 12.868 6.18965 13.0612 6.19913C13.2543 6.20862 13.437 6.2896 13.5737 6.42631C13.7104 6.56303 13.7914 6.74572 13.8009 6.93884C13.8104 7.13195 13.7477 7.32169 13.625 7.47115L11.0865 10L13.625 12.5288Z"
                                    fill="#F30C0C"
                                  />
                                </svg>
                              </div>
                              <div className="title"> Message warning</div>
                              <svg
                                className="icon-close"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="100"
                                height="100"
                                viewBox="0 0 50 50"
                              >
                                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                              </svg>
                            </div>

                            <div className="message-content">{message}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <img src={icon_annount} className="icon-feature" />
                </div>
              </div>
            </div>
            <div className="home-content-survival-time">August 12,2021</div>

            <div className="home-content-survival-list-value">
              <div className="home-content-survival-value">
                <div className="home-content-survival-value-item">
                  <img src={icon_heart_beat} className="icon-survival-index" />
                  <div className="home-content-survival-item-heading">
                    Heart Rate
                  </div>
                </div>
                {/* {snapshots &&
                  snapshots.val() &&
                  snapshots.val().valueHeartBeat && (
                    // <div className="survival-index-param">
                    //   {snapshots.val().valueHeartBeat}
                    //   <div className="survival-index-unit">bpm</div>
                    // </div>
                  )} */}
                <div className="survival-index-param">
                  {lastValue}
                  <div className="survival-index-unit">bpm</div>
                </div>

                <div className="survival-index-status heart-beat">Normal</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="130"
                  height="72"
                  viewBox="0 0 175 72"
                  fill="none"
                >
                  <path
                    d="M36.5268 31.7124C22.6163 29.5678 13.3533 31.143 1 37.7541V71.5H174V1C163.142 5.71892 157.566 9.70855 146.196 13.0836C127.836 18.5336 113.978 8.36761 97.2827 17.6149C82.7445 25.6674 86.5382 47.5518 69.994 49.8377C55.2005 51.8817 51.2849 33.9876 36.5268 31.7124Z"
                    fill="url(#paint0_linear_1_675)"
                    fill-opacity="0.4"
                  />
                  <path
                    d="M1 37.7541C13.3533 31.143 22.6163 29.5678 36.5268 31.7124C51.2849 33.9876 55.2005 51.8817 69.9941 49.8377C86.5382 47.5518 82.7445 25.6674 97.2827 17.6149C113.978 8.36761 127.836 18.5336 146.196 13.0836C157.566 9.70855 163.142 5.71892 174 1"
                    stroke="#CA6B6E"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1_675"
                      x1="88.0058"
                      y1="-19"
                      x2="88.0059"
                      y2="68"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#DA8184" />
                      <stop offset="1" stop-color="#CA6B6E" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="home-content-survival-value">
                <div className="home-content-survival-value-item">
                  <img src={icon_spo2} className="icon-survival-index" />
                  <div className="home-content-survival-item-heading">
                    Oxy in Blood
                  </div>
                </div>
                {snapshots &&
                  snapshots.val() &&
                  snapshots.val().valueOxygenBlood && (
                    <div className="survival-index-param">
                      {snapshots.val().valueOxygenBlood}
                      <div className="survival-index-unit">%</div>
                    </div>
                  )}
                {/* <div className="survival-index-param">
                  <div className="survival-index-unit">%</div>
                </div> */}
                <div className="survival-index-status oxy-blood">Normal</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="130"
                  height="72"
                  viewBox="0 0 175 72"
                  fill="none"
                >
                  <path
                    d="M36.5268 31.7124C22.6163 29.5678 13.3533 31.143 1 37.7541V71.5H174V1C163.142 5.71892 157.566 9.70855 146.196 13.0836C127.836 18.5336 113.978 8.36761 97.2827 17.6149C82.7445 25.6674 86.5382 47.5518 69.994 49.8377C55.2005 51.8817 51.2849 33.9876 36.5268 31.7124Z"
                    fill="url(#paint0_linear_1_675)"
                    fill-opacity="0.4"
                  />
                  <path
                    d="M1 37.7541C13.3533 31.143 22.6163 29.5678 36.5268 31.7124C51.2849 33.9876 55.2005 51.8817 69.9941 49.8377C86.5382 47.5518 82.7445 25.6674 97.2827 17.6149C113.978 8.36761 127.836 18.5336 146.196 13.0836C157.566 9.70855 163.142 5.71892 174 1"
                    stroke="#CA6B6E"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1_675"
                      x1="88.0058"
                      y1="-19"
                      x2="88.0059"
                      y2="68"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#DA8184" />
                      <stop offset="1" stop-color="#CA6B6E" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="home-content-survival-value">
                <div className="home-content-survival-value-item">
                  <img src={icon_temperature} className="icon-survival-index" />
                  <div className="home-content-survival-item-heading">
                    Temperature
                  </div>
                </div>
                {snapshots &&
                  snapshots.val() &&
                  snapshots.val().valueTemperature && (
                    <div className="survival-index-param">
                      {snapshots.val().valueTemperature}
                      <div className="survival-index-unit">°C</div>
                    </div>
                  )}

                <div className="survival-index-status temperature">Normal</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="130"
                  height="74"
                  viewBox="0 0 175 74"
                  fill="none"
                >
                  <path
                    d="M37.1969 31.2276C20.8911 32.8764 1 51.2276 1 51.2276V73.5H174V26.2276C174 26.2276 160.59 31.89 151.643 31.2276C133.463 29.8816 135.591 3.88336 117.575 1.22759C93.647 -2.29971 93.8029 36.3114 69.6677 38.2276C56.7036 39.2569 50.1325 29.9196 37.1969 31.2276Z"
                    fill="url(#paint0_linear_1_495)"
                  />
                  <path
                    d="M1 51.2276C1 51.2276 20.8911 32.8764 37.1969 31.2276C50.1325 29.9196 56.7036 39.2569 69.6677 38.2276C93.8029 36.3114 93.647 -2.29971 117.575 1.22759C135.591 3.88336 133.463 29.8816 151.643 31.2276C160.59 31.89 174 26.2276 174 26.2276"
                    stroke="#F3A53F"
                    stroke-linecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1_495"
                      x1="87.5"
                      y1="1"
                      x2="87.5"
                      y2="73.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#F8DEBD" />
                      <stop offset="1" stop-color="#FBEBD6" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="home-content-survival-value">
                <div className="home-content-survival-value-item">
                  <img src={icon_air} className="icon-survival-index" />
                  <div className="home-content-survival-item-heading">
                    Air Quality
                  </div>
                </div>
                <div className="survival-index-param">
                  {/* {healthData.valueAirQuality}{" "} */}
                  {healthData && healthData.valueAirQuality != undefined
                    ? healthData.valueAirQuality
                    : "_"}{" "}
                  <div className="survival-index-unit"></div>
                </div>
                <div className="survival-index-status air-quality"> Good</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="130"
                  height="73"
                  viewBox="0 0 175 73"
                  fill="none"
                >
                  <path
                    d="M28.6599 46.8393C17.7076 48.6309 9.98645 46.8164 1 40.3393V72.8394H174V32.3393C164.573 20.4283 164.435 6.28226 149.86 1.83929C133.611 -3.11414 126.356 15.3491 109.628 18.3393C90.2508 21.8031 77.4767 7.23051 59.3372 14.8393C43.3386 21.5501 45.7938 44.0365 28.6599 46.8393Z"
                    fill="url(#paint0_linear_1_510)"
                  />
                  <path
                    d="M1 40.3393C9.98645 46.8164 17.7076 48.6309 28.6599 46.8393C45.7938 44.0365 43.3386 21.5501 59.3372 14.8393C77.4767 7.23051 90.2508 21.8031 109.628 18.3393C126.356 15.3491 133.611 -3.11414 149.86 1.83929C164.435 6.28226 164.573 20.4283 174 32.3393"
                    stroke="#478F96"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1_510"
                      x1="87.5"
                      y1="12.5"
                      x2="87.5"
                      y2="72.8394"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#D0FBFF" />
                      <stop offset="1" stop-color="#DDF2F4" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <Donut />
            <div className="home-content-survival-heart-beat-chart">
              <div className="home-content-survival-heart-beat-heading">
                ECG electrocardiogram
              </div>
              <div className="home-content-survival-heart-beat-img">
                <img src={icon_heart} className="icon-heart" />
                <div className="image-ecg-background">
                  <div className="image-ecg-background-heading">ECG</div>
                  <img src={icon_ecg} className="icon-ecg" />
                </div>
                <div className="image-warter-background">
                  <div className="image-ecg-background-heading">
                    It’s time to drink some water
                    <br></br>
                    <div>
                      6h30 - 7h, 8h - 9h, 13h - 14h, 16h - 17h, 21h -22h
                    </div>
                  </div>
                  <div className="backgroung-icon-water">
                    <img src={icon_warter} className="icon-warter" />
                  </div>
                </div>
              </div>
            </div>
            <EcgChart />
          </div>

          <div className="home-content-BIM-calculator-container">
            <div className="home-content-BIM-calculator-heading">
              BMI Calculator
            </div>
            <div className="home-content-BIM-calculator">
              <div className="home-content-display-height-weight">
                <div className="home-content-display-value">
                  <img src={icon_meansure_height} className="icon-measaure" />
                  <div className="home-content-display-value-detail">
                    Height{" "}
                    <div className="value">
                      {height}
                      cm
                    </div>
                  </div>
                </div>
                <div className="home-content-display-value bg-weight">
                  <img src={icon_meansure_weight} className="icon-measaure" />
                  <div className="home-content-display-value-detail">
                    weight{" "}
                    <div className="value">
                      {weight}
                      kg
                    </div>
                  </div>
                </div>
              </div>
              <div className="home-content-BIM-calculator-base">
                <div className="heading">Body Mass Index (BMI)</div>
                <div className="item-value">
                  <div className="value">{bmi}</div>
                  <div className="status-health">
                    {bmi < 25 ? (
                      <div>You are underweight</div>
                    ) : bmi >= 25 && bmi < 30 ? (
                      <div>You are Healthy</div>
                    ) : (
                      <div>You are overweight</div>
                    )}
                    {/* {bmi < 25 ? (
                      <div>You are underweight</div>
                    ) : bmi >= 25 && bmi < 30 ? (
                      <div>You are healthy</div>
                    ) : (
                      <div>You are overweight</div>
                    )} */}
                  </div>
                </div>
                {/* <input type="range" className="range-slider" value={value} /> */}
                <input type="range" className="range-slider" value={bmi} />
              </div>
            </div>
            <div className="home-content-calendar">
              <Calendar />
            </div>
            {/* <div className="home-content-overall-health">
              <div className="heading">Overall Health</div>
              <div className="analysis health">2% greater than last weak</div>
            </div> */}
            <div className="home-map">
              <MapContainer latitude={latitude} longitude={longitude} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
