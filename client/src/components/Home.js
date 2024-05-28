import React from "react";
import { useNavigate } from "react-router-dom";
import { GoClock } from "react-icons/go";
import { GiPathDistance } from "react-icons/gi";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto p-4">
        <div className="text-black m-10">
          <h4 className="text-2xl text-center font-bold mb-4">
            About Transport Guide
          </h4>
          <p className="text-center">
            The Electric Transport Guide is the ultimate app for transforming
            your personal transportation experience. Whether you prefer walking,
            electric skateboards, scooters, or other electric modes of
            transport, this application is designed to assist you in calculating
            travel times based on distance, and vice versa!
            <br /> <br /> Simply select any option from the navigation menu
            below to explore distance-based or time-based calculations for a
            variety of electric transportation modes.
          </p>
        </div>
        <div className="bg-white mb-14 p-8 m-8 rounded-lg shadow-lg text-center">
          <h4 className=" font-bold mb-6">
            To calculate Time or Distance Click Here
          </h4>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/calculate-time")}
              className="bg-teal-600 inline-flex items-center text-white py-3 px-6 rounded hover:bg-teal-500 transition duration-300"
            >
              <GoClock className="mr-2 text-lg" />{" "}
             
              Calculate Time
            </button>
            <button
              onClick={() => navigate("/calculate-distance")}
              className="bg-teal-600 inline-flex items-center text-white py-3 px-6 rounded hover:bg-teal-500 transition duration-300"
            >
              <GiPathDistance  className="mr-2 text-lg" />
              Calculate Distance
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
