import { Sprout, Cloud, TrendingUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SoilInputForm from "@/components/SoilInputForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Sprout className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            AI Crop Recommendation Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Smart farming powered by AI. Get personalized crop recommendations based on your soil, weather, and market conditions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12 max-w-5xl mx-auto">
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Sprout className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Soil Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Enter your soil parameters and get instant AI-powered crop recommendations
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Cloud className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Weather Insights</h3>
            <p className="text-sm text-muted-foreground">
              Real-time weather data and forecasts for better planning
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Market Trends</h3>
            <p className="text-sm text-muted-foreground">
              Current crop prices and market trends to maximize profits
            </p>
          </div>
        </div>

        <SoilInputForm />

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Helping farmers make data-driven decisions for better yields
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
