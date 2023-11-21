import React, { useEffect, useState } from "react";
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
import SimpleMap from "../../components/GoogleMap/GooleMap";
import GooleMap from "../../components/GoogleMap/GooleMap";
import getData from "../../api/getData";
import "./home.scss";

const Home: React.FC = () => {
  const [healthData, setHealthData] = useState<any>();
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
  useEffect(() => {
    console.log("useEffectt call");
    fetchData();
  }, []);

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
            <Link to="">
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
                <div className="survival-index-param">
                  {/* {healthData.valueHeartBeat} */}
                  {healthData && healthData.valueHeartBeat !== undefined
                    ? healthData.valueHeartBeat
                    : "_"}
                  <span className="survival-index-unit">bpm</span>
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
                <div className="survival-index-param">
                  {/* {healthData.valueOxygenBoold}{" "} */}
                  {healthData && healthData.valueOxygenBoold !== undefined
                    ? healthData.valueOxygenBoold
                    : "_"}{" "}
                  <span className="survival-index-unit">%</span>
                </div>
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
                <div className="survival-index-param">
                  {/* {healthData.valueTemperature} */}
                  {healthData && healthData.valueTemperature != undefined
                    ? healthData.valueTemperature
                    : "_"}
                  <span className="survival-index-unit">°C</span>
                </div>
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
                  <span className="survival-index-unit"></span>
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
                    <span>
                      6h30 - 7h, 8h - 9h, 13h - 14h, 16h - 17h, 21h -22h
                    </span>
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
                    Height <span className="value">170 cm</span>
                  </div>
                </div>
                <div className="home-content-display-value bg-weight">
                  <img src={icon_meansure_weight} className="icon-measaure" />
                  <div className="home-content-display-value-detail">
                    weight <span className="value">72 kg</span>
                  </div>
                </div>
              </div>
              <div className="home-content-BIM-calculator-base">
                <div className="heading">Body Mass Index (BMI)</div>
                <div className="item-value">
                  <div className="value">24.9</div>
                  <div className="status-health">You’re Healthy</div>
                </div>
                {/* <input type="range" className="range-slider" value={value} /> */}
                <input type="range" className="range-slider" />
              </div>
            </div>
            <div className="home-content-calendar">
              <Calendar />
            </div>
            <div className="home-content-overall-health">
              <div className="heading">Overall Health</div>
              <div className="analysis health">2% greater than last weak</div>
            </div>
            <div>
              <GooleMap/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
