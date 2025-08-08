import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";

// Define interfaces (unchanged)
interface PcosFormData {
  pcos: "Yes" | "No" | "";
  follicleR: string;
  follicleL: string;
  skinDarkening: "Yes" | "No" | "";
  hairGrowth: "Yes" | "No" | "";
  weightGain: "Yes" | "No" | "";
  cycle: "Regular" | "Irregular" | "";
  fastFood: "Yes" | "No" | "";
  pimples: "Yes" | "No" | "";
  amh: string;
  weight: string;
}

interface PcosWeights {
  pcos: number;
  follicleR: number;
  follicleL: number;
  skinDarkening: number;
  hairGrowth: number;
  weightGain: number;
  cycle: number;
  fastFood: number;
  pimples: number;
  amh: number;
  weight: number;
}

interface NumericalPcosData {
  pcos: number;
  follicleR: number;
  follicleL: number;
  skinDarkening: number;
  hairGrowth: number;
  weightGain: number;
  cycle: number;
  fastFood: number;
  pimples: number;
  amh: number;
  weight: number;
}

// Weights (unchanged)
const weights: PcosWeights = {
  pcos: 1.0,
  follicleR: 0.648327,
  follicleL: 0.603346,
  skinDarkening: 0.475733,
  hairGrowth: 0.464667,
  weightGain: 0.441047,
  cycle: 0.401644,
  fastFood: 0.377933,
  pimples: 0.286077,
  amh: 0.263863,
  weight: 0.211938,
};

const PcosAssessmentForm = () => {
  const [formData, setFormData] = useState<PcosFormData>({
    pcos: "",
    follicleR: "",
    follicleL: "",
    skinDarkening: "",
    hairGrowth: "",
    weightGain: "",
    cycle: "",
    fastFood: "",
    pimples: "",
    amh: "",
    weight: "",
  });

  // getNumericalData and calculateScore (unchanged)
  const getNumericalData = (data: PcosFormData): NumericalPcosData => {
    return {
      pcos: data.pcos === "Yes" ? 1 : 0,
      follicleR: parseFloat(data.follicleR) || 0,
      follicleL: parseFloat(data.follicleL) || 0,
      skinDarkening: data.skinDarkening === "Yes" ? 1 : 0,
      hairGrowth: data.hairGrowth === "Yes" ? 1 : 0,
      weightGain: data.weightGain === "Yes" ? 1 : 0,
      cycle: data.cycle === "Irregular" ? 1 : 0,
      fastFood: data.fastFood === "Yes" ? 1 : 0,
      pimples: data.pimples === "Yes" ? 1 : 0,
      amh: parseFloat(data.amh) || 0,
      weight: parseFloat(data.weight) || 0,
    };
  };

  const calculateScore = (data: PcosFormData): string => {
    const numericalData = getNumericalData(data);
    let score = 0;
    for (const key in weights) {
      const weightKey = key as keyof PcosWeights;
      score += numericalData[weightKey] * weights[weightKey];
    }
    return score.toFixed(2);
  };

  // Handle form submission (unchanged)
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const score = calculateScore(formData);
    alert(`Your PCOS assessment score is: ${score}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ScrollArea className="max-h-[800px] pr-4">
        <div className="space-y-4 pb-6">
          <div className="flex items-center justify-between">
            <label htmlFor="pcos" className="block text-sm font-medium">
              PCOS
            </label>
            <Select
              value={formData.pcos}
              onValueChange={(value) =>
                setFormData({ ...formData, pcos: value as "Yes" | "No" })
              }
            >
              <SelectTrigger className="w-1/3">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="follicleR" className="block text-sm font-medium">
              Follicle Number (Right)
            </label>
            <Input
              className="w-1/3"
              type="number"
              id="follicleR"
              value={formData.follicleR}
              onChange={(e) => setFormData({ ...formData, follicleR: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="follicleL" className="block text-sm font-medium">
              Follicle Number (Left)
            </label>
            <Input
              className="w-1/3"
              type="number"
              id="follicleL"
              value={formData.follicleL}
              onChange={(e) => setFormData({ ...formData, follicleL: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="skinDarkening" className="block text-sm font-medium">
              Skin Darkening
            </label>
            <Select
              value={formData.skinDarkening}
              onValueChange={(value) =>
                setFormData({ ...formData, skinDarkening: value as "Yes" | "No" })
              }
            >
              <SelectTrigger className="w-1/3">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="hairGrowth" className="block text-sm font-medium">
              Hair Growth
            </label>
            <Select
              value={formData.hairGrowth}
              onValueChange={(value) =>
                setFormData({ ...formData, hairGrowth: value as "Yes" | "No" })
              }
            >
              <SelectTrigger className="w-1/3">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="weightGain" className="block text-sm font-medium">
              Weight Gain
            </label>
            <Select
              value={formData.weightGain}
              onValueChange={(value) =>
                setFormData({ ...formData, weightGain: value as "Yes" | "No" })
              }
            >
              <SelectTrigger className="w-1/3">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="cycle" className="block text-sm font-medium">
              Menstrual Cycle
            </label>
            <Select
              value={formData.cycle}
              onValueChange={(value) =>
                setFormData({ ...formData, cycle: value as "Regular" | "Irregular" })
              }
            >
              <SelectTrigger className="w-1/3">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Regular">Regular</SelectItem>
                <SelectItem value="Irregular">Irregular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="fastFood" className="block text-sm font-medium">
              Fast Food Consumption
            </label>
            <Select
              value={formData.fastFood}
              onValueChange={(value) =>
                setFormData({ ...formData, fastFood: value as "Yes" | "No" })
              }
            >
              <SelectTrigger className="w-1/3">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="pimples" className="block text-sm font-medium">
              Pimples
            </label>
            <Select
              value={formData.pimples}
              onValueChange={(value) =>
                setFormData({ ...formData, pimples: value as "Yes" | "No" })
              }
            >
              <SelectTrigger className="w-1/3">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="amh" className="block text-sm font-medium">
              AMH (ng/mL)
            </label>
            <Input
              className="w-1/3"
              type="number"
              id="amh"
              step="0.1"
              value={formData.amh}
              onChange={(e) => setFormData({ ...formData, amh: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="weight" className="block text-sm font-medium">
              Weight (Kg)
            </label>
            <Input
              className="w-1/3"
              type="number"
              id="weight"
              step="0.1"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            />
          </div>
        </div>
      </ScrollArea>
      {/* Sticky Footer for Buttons */}
      <div className="sticky bottom-0 bg-background p-4 border-t">
        <div className="flex justify-end gap-4">
          <Button type="submit">Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DrawerClose>
        </div>
      </div>
    </form>
  );
};

export default PcosAssessmentForm;