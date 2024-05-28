import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://coding-assignment.onrender.com";

const CalculateTime = () => {
  const [distance, setDistance] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [result, setResult] = useState(null);
  const [comparison, setComparison] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/vehicles`)
      .then((response) => setVehicles(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleCalculate = () => {
    axios
      .post(`${BASE_URL}/calculate_time`, {
        distance,
        type: selectedVehicle,
      })
      .then((response) => {
        const { travelTime, fuelConsumption, outOfRange } = response.data;
        setResult({ travelTime, fuelConsumption, outOfRange });

        if (!outOfRange) {
          const comparisonData = vehicles.map((vehicle) => {
            const travelTime = distance / vehicle.topSpeed;
            const fuelConsumption = distance / vehicle.fuelEfficiency;
            return { ...vehicle, travelTime, fuelConsumption };
          });
          setComparison(comparisonData);
        } else {
          setComparison([]);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <p className="mb-8 text-gray-700">
          Enter the distance in kilometers, select your vehicle type, and
          discover the travel time for that distance. Additionally, receive a
          detailed comparison of travel times across various other
          transportation modes.
        </p>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="input-section mb-6">
            <label
              htmlFor="distance"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter Distance (KM):
            </label>
            <input
              type="number"
              id="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="vehicle-selection mb-6">
            <h2 className="block text-gray-700 font-bold mb-2">
              Select Vehicle Type:
            </h2>
            <select
              id="vehicle"
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select a vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.type} value={vehicle.type}>
                  {vehicle.type}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleCalculate}
            className="bg-emerald-600 text-white py-3 px-6 rounded hover:bg-emerald-500 transition duration-300"
          >
            Calculate Time
          </button>
          {result && !result.outOfRange && (
            <div className="result-section bg-gray-100 p-6 rounded mt-6">
              <h2 className="text-2xl font-bold mb-4">Results:</h2>
              <p className="text-gray-700">
                Travel Time:{" "}
                <span className="font-semibold">
                  {Math.floor(result.travelTime)}
                </span>{" "}
                hours{" "}
                <span className="font-semibold">
                  {Math.round((result.travelTime - Math.floor(result.travelTime)) * 60)}
                </span>{" "}
                minutes
              </p>
              <p className="text-gray-700">
                Fuel Consumption:{" "}
                <span className="font-semibold">
                  {result.fuelConsumption.toFixed(2)}
                </span>{" "}
                liters
              </p>
            </div>
          )}
          {result && !result.outOfRange && (
            <div className="comparison-section bg-gray-100 p-6 rounded mt-6">
              <h3 className="text-xl font-bold mt-8 mb-4">
                Comparison with Other Vehicles:
              </h3>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Vehicle</th>
                    <th className="py-2 px-4 border-b">
                      Travel Time (Hours and Minutes)
                    </th>
                    <th className="py-2 px-4 border-b">
                      Fuel Consumption (Liters)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((vehicle) => (
                    <tr key={vehicle.type}>
                      <td className="py-2 text-center px-4 border-b">
                        {vehicle.type}
                      </td>
                      <td className="py-2 text-center px-4 border-b">
                        <span>{Math.floor(vehicle.travelTime)}</span> hrs{" "}
                        <span>
                          {Math.round(
                            (vehicle.travelTime - Math.floor(vehicle.travelTime)) * 60
                          )}
                        </span>{" "}
                        min
                      </td>
                      <td className="py-2 text-center px-4 border-b">
                        {vehicle.fuelConsumption.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {result && result.outOfRange && (
            <div className="result-section bg-gray-100 p-6 rounded mt-6">
              <p className="text-red-500 text-2xl text-center bg-black font-bold p-6 mt-4">
                The distance exceeds the maximum range of the selected vehicle!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculateTime;
