import React, { useState } from "react";
import img from "../images/weather-91-512.png";
import Info from "./Info";

export default function Home() {
  var x = 0,
    y = 0;
  const [daydata, setdaydata] = useState([
    {
      timelines: {
        daily: [
          {},
        ],
      },
    },
  ]);
  const getloc = () => {
    async function success(position) {
      const cordlat = position.coords.latitude;
      const cordlong = position.coords.longitude;

      x = cordlat;

      y = cordlong;

      console.log(x, y, cordlat, cordlong);
    }
    function error() {
      console.log("Unable to retrieve your location");
    }
    navigator.geolocation.getCurrentPosition(success, error);
    setTimeout(() => {
      fetchdata();
    }, 5000);
    //  console.log(lat,long);
  };
  const fetchdata = () => {
    if (y === 0) {
      console.log(x, y);
      console.log("Incorrect Location");
    } else {
      console.log("Welcome !!!");
      fetch(
        `https://api.tomorrow.io/v4/weather/forecast?location=${x},${y}&apikey=${import.meta.env.VITE_API}`,
      )
        .then((response) => response.json())
        .then((d) => setdaydata(d))
        .catch((error) => console.error(error));
      console.log(daydata.timelines.daily);
    }
  };
  return (
    <>
      <div className="main relative h-screen w-screen bg-[#001219] text-[white] flex flex-col justify-evenly text-center">
        <img
          className="h-[40vh] mx-auto my-0 pt-[10vh];
          /* width: 20vw; */
          filter invert"
          src={img}
          alt="weatherimage"
        />
        <h1 className="text-5xl"> Weather Forecast</h1>

        <button
          type="button"
          className="px-5 py-2.5 text-md 
        mx-auto justify-center w-96 font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={getloc}
        >
          Use Current Location
          <svg
            className="filter invert ml-2"
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="12"
            viewBox="0 0 384 512"
          >
            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
          </svg>
        </button>
      </div>

      <div className="datasection flex flex-wrap justify-around gap-5 bg-gray-950 p-10">
        {daydata && daydata?.timelines?.daily ? (
          daydata.timelines.daily.map((element) => {
            function easytime(isoDate) {
              const date = new Date(isoDate);
              const options = {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              };

              return date.toLocaleTimeString("en-US", options);
            }

            return (
              <div className="datacard">
                <Info
                  temperature={element.values.temperatureAvg}
                  date={new Date(element.time).toLocaleString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  humidity={element.values.humidityAvg}
                  risetime={easytime(element.values.sunriseTime)}
                  settime={easytime(element.values.sunsetTime)}
                  rainp={element.values.precipitationProbabilityAvg}
                />
              </div>
            );
          })
        ) : (
          <p className="text-white">
            Press the above button and wait for response.
          </p>
        )}
      </div>
    </>
  );
}
