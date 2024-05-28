import express from "express"
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());
const vehicles = [
  { type: "Maruti Suzuki Alto", topSpeed: 140, fuelEfficiency: 22.05, fuelTankCapacity: 35, maxRange: 771.75 },
  { type: "Hyundai i20", topSpeed: 180, fuelEfficiency: 20.35, fuelTankCapacity: 37, maxRange: 753.05 },
  { type: "Tata Nexon", topSpeed: 180, fuelEfficiency: 17.57, fuelTankCapacity: 44, maxRange: 772.68 },
  { type: "Honda City", topSpeed: 180, fuelEfficiency: 17.8, fuelTankCapacity: 40, maxRange: 712.00 },
  { type: "Mahindra Thar", topSpeed: 155, fuelEfficiency: 15.2, fuelTankCapacity: 57, maxRange: 866.40 },
  { type: "Toyota Innova Crysta", topSpeed: 179, fuelEfficiency: 11.25, fuelTankCapacity: 55, maxRange: 618.75 },
  { type: "Kia Seltos", topSpeed: 170, fuelEfficiency: 16.8, fuelTankCapacity: 50, maxRange: 840.00 },
  { type: "Renault Kwid", topSpeed: 150, fuelEfficiency: 22.3, fuelTankCapacity: 28, maxRange: 624.40 },
  { type: "Ford EcoSport", topSpeed: 182, fuelEfficiency: 15.9, fuelTankCapacity: 52, maxRange: 826.80 },
  { type: "Tata Tiago", topSpeed: 150, fuelEfficiency: 23.84, fuelTankCapacity: 35, maxRange: 834.40 }
];

app.get('/vehicles', (req, res) => {
  res.json(vehicles);
});

app.post('/calculate_time', (req, res) => {
  const { distance, type } = req.body;
  const vehicle = vehicles.find(v => v.type === type);
  
  if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

  const travelTime = distance / vehicle.topSpeed;
 
  const fuelConsumption = distance / vehicle.fuelEfficiency;
  const outOfRange = distance > vehicle.maxRange;

  res.json({        
    travelTime,
    fuelConsumption, 
    outOfRange        
  });
});

app.post('/calculate_distance', (req, res) => {
  const { time, type } = req.body;
  const vehicle = vehicles.find(v => v.type === type);
  
  if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

  const distance = time * vehicle.topSpeed;
  const fuelConsumption = distance / vehicle.fuelEfficiency;
  const outOfRange = distance > vehicle.maxRange;

  res.json({
    distance,
    fuelConsumption,
    outOfRange
  });  
});

const PORT  = process.env.PORT || 8000;  

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
