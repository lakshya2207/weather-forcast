import React from "react";

export default function Info(props) {
  let { date, temperature, humidity, risetime, settime, rainp } = props;
  return (
    <>
      <a
        href="#"
        className="block max-w-sm p-6 bg-[#252525] border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {date}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 shadow-md">
          Average Temperature : {temperature}°C
        </p>

        <p className="font-normal text-gray-700 dark:text-gray-400 shadow-md">
          Humidity: {humidity}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400 shadow-md">
          Surise : {risetime}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400 shadow-md">
          Sunset :{settime}{" "}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400 shadow-md">
          Rain Probablity: {rainp}{" "}
        </p>
      </a>
    </>
  );
}
