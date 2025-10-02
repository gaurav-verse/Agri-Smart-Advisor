import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Sprout, DollarSign, Calendar } from "lucide-react";
import { CropRecommendation, getMarketPrices, getWeatherForecast } from "@/utils/cropRecommendation";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendations = location.state?.recommendations as CropRecommendation[] || [];

  const weather = getWeatherForecast();
  const marketPrices = getMarketPrices();

  if (recommendations.length === 0) {
    navigate("/");
    return null;
  }

  const getSuitabilityColor = (score: number) => {
    if (score >= 80) return "text-primary";
    if (score >= 60) return "text-accent";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Input
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            AI Crop Recommendations
          </h1>
          <p className="text-muted-foreground">
            Based on your soil analysis and current conditions
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Weather</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weather.temperature}°C</div>
              <p className="text-xs text-muted-foreground mt-1">
                Humidity: {weather.humidity}%
              </p>
              <p className="text-xs text-muted-foreground">
                {weather.forecast}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Expected Rainfall</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weather.rainfall}mm</div>
              <p className="text-xs text-muted-foreground mt-1">
                Next 7 days forecast
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Market Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Stable</div>
              <p className="text-xs text-muted-foreground mt-1">
                Overall crop prices trending up
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Top Recommended Crops
          </h2>
          <div className="grid gap-4">
            {recommendations.slice(0, 5).map((crop, index) => (
              <Card key={crop.name} className={index === 0 ? "border-primary" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sprout className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{crop.name}</CardTitle>
                        <CardDescription>
                          {index === 0 && "🏆 Best Match"}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getSuitabilityColor(crop.suitability)}`}>
                        {crop.suitability}%
                      </div>
                      <div className="text-xs text-muted-foreground">Suitability</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={crop.suitability} className="h-2" />
                  
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <Sprout className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Expected Yield</div>
                        <div className="text-sm font-medium">{crop.expectedYield}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Market Price</div>
                        <div className="text-sm font-medium">{crop.marketPrice}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Best Season</div>
                        <div className="text-sm font-medium">{crop.seasonalTiming.split("(")[0].trim()}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Analysis</h4>
                    <ul className="space-y-1">
                      {crop.reasons.map((reason, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Current Market Prices
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {marketPrices.map((item) => (
              <Card key={item.crop}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">{item.crop}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">${item.price}</div>
                    <div className={`flex items-center gap-1 text-sm ${
                      item.trend === 'up' ? 'text-primary' : 
                      item.trend === 'down' ? 'text-destructive' : 
                      'text-muted-foreground'
                    }`}>
                      {item.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                      {item.trend === 'down' && <TrendingDown className="h-4 w-4" />}
                      {item.trend === 'stable' && <Minus className="h-4 w-4" />}
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
