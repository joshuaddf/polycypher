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
import { useAuth } from "@/lib/hooks/useAuth";
import { saveAssessment, PcosFormData } from "@/lib/services/assessmentService";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRevalidation } from "@/lib/hooks/useRevalidation";

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
  const { user, isAuthenticated, isLoading } = useAuth();
  const { refreshDashboard } = useRevalidation();
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Auto-save functionality removed to prevent duplicate assessments

  // Auto-save disabled to prevent duplicate assessments
  // useEffect(() => {
  //   if (isSubmitting) return;
  //   
  //   const timeoutId = setTimeout(() => {
  //     const hasData = Object.values(formData).some(value => value !== "");
  //     if (hasData) {
  //       saveAssessmentData(formData, true);
  //     }
  //   }, 2000);

  //   return () => clearTimeout(timeoutId);
  // }, [formData, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      toast.error("Please log in to submit your assessment");
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const score = calculateScore(formData);
      await saveAssessment(formData, score);
      toast.success(`Assessment submitted successfully! Your PCOS assessment score is: ${score}`);
      
      // Assessment submitted successfully
      
      refreshDashboard();
    } catch (error) {
      console.error("Error submitting assessment:", error);
      toast.error("Failed to submit assessment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof PcosFormData, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      if (isSubmitting) {
        setIsSubmitting(false);
      }
      
      return newData;
    });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-32">Loading...</div>;
  }

  return (
    <div className="h-[60vh] flex flex-col">
      <ScrollArea className="flex-1 overflow-auto">
        <form id="pcos-form" onSubmit={handleSubmit} className="space-y-4 p-4 max-w-2xl mx-auto">
          <div className="space-y-4 pb-6">
            <div className="flex items-center justify-between">
              <label htmlFor="pcos" className="block text-sm font-medium">
                PCOS
              </label>
              <Select
                value={formData.pcos}
                onValueChange={(value) => updateFormData("pcos", value as "Yes" | "No")}
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
                onChange={(e) => updateFormData("follicleR", e.target.value)}
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
                onChange={(e) => updateFormData("follicleL", e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="skinDarkening" className="block text-sm font-medium">
                Skin Darkening
              </label>
              <Select
                value={formData.skinDarkening}
                onValueChange={(value) => updateFormData("skinDarkening", value as "Yes" | "No")}
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
                onValueChange={(value) => updateFormData("hairGrowth", value as "Yes" | "No")}
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
                onValueChange={(value) => updateFormData("weightGain", value as "Yes" | "No")}
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
                onValueChange={(value) => updateFormData("cycle", value as "Regular" | "Irregular")}
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
                onValueChange={(value) => updateFormData("fastFood", value as "Yes" | "No")}
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
                onValueChange={(value) => updateFormData("pimples", value as "Yes" | "No")}
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
                onChange={(e) => updateFormData("amh", e.target.value)}
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
                onChange={(e) => updateFormData("weight", e.target.value)}
              />
            </div>
          </div>
        </form>
      </ScrollArea>
      <div className="sticky bottom-0 bg-background p-4 border-t">
        <div className="flex justify-between items-center w-full">
          <div className="text-sm text-muted-foreground">
            {isSubmitting && "Submitting..."}
            {!isAuthenticated && "Please log in to save your assessment"}
          </div>
          <div className="flex gap-4">
            <Button type="submit" form="pcos-form" disabled={isSubmitting || !isAuthenticated}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PcosAssessmentForm;