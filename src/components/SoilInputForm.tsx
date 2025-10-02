import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getCropRecommendations, SoilData } from "@/utils/cropRecommendation";
import { Sprout } from "lucide-react";

const SoilInputForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<SoilData>({
    nitrogen: 60,
    phosphorus: 40,
    potassium: 35,
    pH: 6.5,
    moisture: 65,
    temperature: 25,
    rainfall: 80,
  });

  const handleChange = (field: keyof SoilData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const recommendations = getCropRecommendations(formData);
    
    toast({
      title: "Analysis Complete",
      description: `Found ${recommendations.length} suitable crops for your soil conditions.`,
    });

    navigate("/dashboard", { state: { recommendations } });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Sprout className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Soil Data Input</CardTitle>
            <CardDescription>Enter your soil parameters for AI analysis</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nitrogen">Nitrogen (kg/ha)</Label>
              <Input
                id="nitrogen"
                type="number"
                value={formData.nitrogen}
                onChange={(e) => handleChange("nitrogen", e.target.value)}
                placeholder="e.g., 60"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phosphorus">Phosphorus (kg/ha)</Label>
              <Input
                id="phosphorus"
                type="number"
                value={formData.phosphorus}
                onChange={(e) => handleChange("phosphorus", e.target.value)}
                placeholder="e.g., 40"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="potassium">Potassium (kg/ha)</Label>
              <Input
                id="potassium"
                type="number"
                value={formData.potassium}
                onChange={(e) => handleChange("potassium", e.target.value)}
                placeholder="e.g., 35"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pH">Soil pH</Label>
              <Input
                id="pH"
                type="number"
                step="0.1"
                value={formData.pH}
                onChange={(e) => handleChange("pH", e.target.value)}
                placeholder="e.g., 6.5"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="moisture">Soil Moisture (%)</Label>
              <Input
                id="moisture"
                type="number"
                value={formData.moisture}
                onChange={(e) => handleChange("moisture", e.target.value)}
                placeholder="e.g., 65"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                type="number"
                value={formData.temperature}
                onChange={(e) => handleChange("temperature", e.target.value)}
                placeholder="e.g., 25"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="rainfall">Average Rainfall (mm/month)</Label>
              <Input
                id="rainfall"
                type="number"
                value={formData.rainfall}
                onChange={(e) => handleChange("rainfall", e.target.value)}
                placeholder="e.g., 80"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Get AI Recommendations
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SoilInputForm;
