export interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  pH: number;
  moisture: number;
  temperature: number;
  rainfall: number;
}

export interface CropRecommendation {
  name: string;
  suitability: number;
  reasons: string[];
  expectedYield: string;
  marketPrice: string;
  seasonalTiming: string;
}

interface CropData {
  name: string;
  idealConditions: {
    nitrogen: [number, number];
    phosphorus: [number, number];
    potassium: [number, number];
    pH: [number, number];
    moisture: [number, number];
    temperature: [number, number];
    rainfall: [number, number];
  };
  yield: string;
  price: string;
  season: string;
}

const cropDatabase: CropData[] = [
  {
    name: "Rice",
    idealConditions: { nitrogen: [40, 80], phosphorus: [20, 60], potassium: [20, 60], pH: [5.5, 7.0], moisture: [60, 90], temperature: [20, 35], rainfall: [150, 300] },
    yield: "4-6 tons/hectare",
    price: "$400-600/ton",
    season: "Monsoon (June-October)"
  },
  {
    name: "Wheat",
    idealConditions: { nitrogen: [50, 100], phosphorus: [30, 70], potassium: [25, 65], pH: [6.0, 7.5], moisture: [40, 70], temperature: [12, 25], rainfall: [50, 100] },
    yield: "3-5 tons/hectare",
    price: "$300-450/ton",
    season: "Winter (November-April)"
  },
  {
    name: "Maize",
    idealConditions: { nitrogen: [60, 120], phosphorus: [40, 80], potassium: [30, 70], pH: [5.5, 7.0], moisture: [50, 80], temperature: [18, 32], rainfall: [60, 120] },
    yield: "5-8 tons/hectare",
    price: "$250-400/ton",
    season: "Summer (March-June)"
  },
  {
    name: "Cotton",
    idealConditions: { nitrogen: [50, 100], phosphorus: [25, 65], potassium: [30, 70], pH: [6.0, 8.0], moisture: [50, 75], temperature: [21, 30], rainfall: [50, 100] },
    yield: "2-3 tons/hectare",
    price: "$800-1200/ton",
    season: "Summer (April-October)"
  },
  {
    name: "Sugarcane",
    idealConditions: { nitrogen: [80, 150], phosphorus: [40, 90], potassium: [50, 100], pH: [6.0, 7.5], moisture: [60, 85], temperature: [20, 35], rainfall: [150, 250] },
    yield: "70-100 tons/hectare",
    price: "$40-60/ton",
    season: "Annual (Planted Feb-March)"
  },
  {
    name: "Soybean",
    idealConditions: { nitrogen: [30, 60], phosphorus: [30, 70], potassium: [30, 70], pH: [6.0, 7.0], moisture: [50, 75], temperature: [20, 30], rainfall: [60, 100] },
    yield: "2-3 tons/hectare",
    price: "$500-700/ton",
    season: "Monsoon (June-September)"
  },
  {
    name: "Tomato",
    idealConditions: { nitrogen: [40, 80], phosphorus: [50, 100], potassium: [50, 100], pH: [6.0, 7.0], moisture: [60, 80], temperature: [18, 27], rainfall: [50, 100] },
    yield: "40-60 tons/hectare",
    price: "$200-400/ton",
    season: "All year (with irrigation)"
  },
  {
    name: "Potato",
    idealConditions: { nitrogen: [50, 100], phosphorus: [40, 80], potassium: [60, 120], pH: [5.5, 6.5], moisture: [60, 80], temperature: [15, 20], rainfall: [50, 100] },
    yield: "25-35 tons/hectare",
    price: "$150-300/ton",
    season: "Winter (October-February)"
  }
];

function calculateSuitability(crop: CropData, soil: SoilData): { score: number; reasons: string[] } {
  let score = 100;
  const reasons: string[] = [];
  
  const checkParam = (value: number, ideal: [number, number], name: string, unit: string) => {
    const [min, max] = ideal;
    const mid = (min + max) / 2;
    const range = max - min;
    
    if (value < min) {
      const deficit = ((min - value) / range) * 30;
      score -= deficit;
      reasons.push(`${name} is low (${value}${unit}). Recommended: ${min}-${max}${unit}`);
    } else if (value > max) {
      const excess = ((value - max) / range) * 30;
      score -= excess;
      reasons.push(`${name} is high (${value}${unit}). Recommended: ${min}-${max}${unit}`);
    } else {
      const proximity = 1 - Math.abs(value - mid) / (range / 2);
      if (proximity > 0.8) {
        reasons.push(`Optimal ${name} levels (${value}${unit})`);
      }
    }
  };
  
  checkParam(soil.nitrogen, crop.idealConditions.nitrogen, "Nitrogen", "kg/ha");
  checkParam(soil.phosphorus, crop.idealConditions.phosphorus, "Phosphorus", "kg/ha");
  checkParam(soil.potassium, crop.idealConditions.potassium, "Potassium", "kg/ha");
  checkParam(soil.pH, crop.idealConditions.pH, "pH", "");
  checkParam(soil.moisture, crop.idealConditions.moisture, "Soil moisture", "%");
  checkParam(soil.temperature, crop.idealConditions.temperature, "Temperature", "°C");
  checkParam(soil.rainfall, crop.idealConditions.rainfall, "Rainfall", "mm");
  
  return { score: Math.max(0, Math.min(100, score)), reasons };
}

export function getCropRecommendations(soilData: SoilData): CropRecommendation[] {
  const recommendations: CropRecommendation[] = [];
  
  for (const crop of cropDatabase) {
    const { score, reasons } = calculateSuitability(crop, soilData);
    
    recommendations.push({
      name: crop.name,
      suitability: Math.round(score),
      reasons: reasons.slice(0, 3),
      expectedYield: crop.yield,
      marketPrice: crop.price,
      seasonalTiming: crop.season
    });
  }
  
  return recommendations.sort((a, b) => b.suitability - a.suitability);
}

export function getWeatherForecast() {
  return {
    temperature: 28,
    humidity: 65,
    rainfall: 15,
    forecast: "Partly cloudy with chance of rain"
  };
}

export function getMarketPrices() {
  return [
    { crop: "Rice", price: 520, trend: "up", change: 5.2 },
    { crop: "Wheat", price: 380, trend: "stable", change: 0.5 },
    { crop: "Maize", price: 320, trend: "down", change: -3.1 },
    { crop: "Cotton", price: 1050, trend: "up", change: 8.3 },
  ];
}
