import { ContentWrapper } from "@/app/components/Wrapper"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Plus } from "lucide-react"
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area";

// Define interfaces for form data, weights, and numerical data
interface PcosFormData {
  pcos: 'Yes' | 'No' | '';
  follicleR: string;
  follicleL: string;
  skinDarkening: 'Yes' | 'No' | '';
  hairGrowth: 'Yes' | 'No' | '';
  weightGain: 'Yes' | 'No' | '';
  cycle: 'Regular' | 'Irregular' | '';
  fastFood: 'Yes' | 'No' | '';
  pimples: 'Yes' | 'No' | '';
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

// Define weights with type annotation
const weights: PcosWeights = {
  pcos: 1.000000,
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

// PCOS Assessment Form Component with TypeScript
const PcosAssessmentForm = () => {
  const [formData, setFormData] = useState<PcosFormData>({
    pcos: '',
    follicleR: '',
    follicleL: '',
    skinDarkening: '',
    hairGrowth: '',
    weightGain: '',
    cycle: '',
    fastFood: '',
    pimples: '',
    amh: '',
    weight: '',
  });

  // Function to convert form data to numerical values for scoring
  const getNumericalData = (data: PcosFormData): NumericalPcosData => {
    return {
      pcos: data.pcos === 'Yes' ? 1 : 0,
      follicleR: parseFloat(data.follicleR) || 0,
      follicleL: parseFloat(data.follicleL) || 0,
      skinDarkening: data.skinDarkening === 'Yes' ? 1 : 0,
      hairGrowth: data.hairGrowth === 'Yes' ? 1 : 0,
      weightGain: data.weightGain === 'Yes' ? 1 : 0,
      cycle: data.cycle === 'Irregular' ? 1 : 0,
      fastFood: data.fastFood === 'Yes' ? 1 : 0,
      pimples: data.pimples === 'Yes' ? 1 : 0,
      amh: parseFloat(data.amh) || 0,
      weight: parseFloat(data.weight) || 0,
    };
  };

  // Function to calculate the weighted score
  const calculateScore = (data: PcosFormData): string => {
    const numericalData = getNumericalData(data);
    let score = 0;
    for (const key in weights) {
      const weightKey = key as keyof PcosWeights;
      score += numericalData[weightKey] * weights[weightKey];
    }
    return score.toFixed(2);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const score = calculateScore(formData);
    alert(`Your PCOS assessment score is: ${score}`);
    // Additional logic for submission (e.g., sending data to a server) can be added here
  };

  return (
    <ScrollArea>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pcos" className="block text-sm font-medium">PCOS</label>
            <Select
              value={formData.pcos}
              onValueChange={(value) => setFormData({ ...formData, pcos: value as 'Yes' | 'No' })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="follicleR" className="block text-sm font-medium">Follicle Number (Right)</label>
            <Input
              type="number"
              id="follicleR"
              value={formData.follicleR}
              onChange={(e) => setFormData({ ...formData, follicleR: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="follicleL" className="block text-sm font-medium">Follicle Number (Left)</label>
            <Input
              type="number"
              id="follicleL"
              value={formData.follicleL}
              onChange={(e) => setFormData({ ...formData, follicleL: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="skinDarkening" className="block text-sm font-medium">Skin darkening</label>
            <Select
              value={formData.skinDarkening}
              onValueChange={(value) => setFormData({ ...formData, skinDarkening: value as 'Yes' | 'No' })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="hairGrowth" className="block text-sm font-medium">Hair growth</label>
            <Select
              value={formData.hairGrowth}
              onValueChange={(value) => setFormData({ ...formData, hairGrowth: value as 'Yes' | 'No' })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="weightGain" className="block text-sm font-medium">Weight gain</label>
            <Select
              value={formData.weightGain}
              onValueChange={(value) => setFormData({ ...formData, weightGain: value as 'Yes' | 'No' })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="cycle" className="block text-sm font-medium">Menstrual Cycle</label>
            <Select
              value={formData.cycle}
              onValueChange={(value) => setFormData({ ...formData, cycle: value as 'Regular' | 'Irregular' })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Regular">Regular</SelectItem>
                <SelectItem value="Irregular">Irregular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="fastFood" className="block text-sm font-medium">Fast food consumption</label>
            <Select
              value={formData.fastFood}
              onValueChange={(value) => setFormData({ ...formData, fastFood: value as 'Yes' | 'No' })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="pimples" className="block text-sm font-medium">Pimples</label>
            <Select
              value={formData.pimples}
              onValueChange={(value) => setFormData({ ...formData, pimples: value as 'Yes' | 'No' })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="amh" className="block text-sm font-medium">AMH (ng/mL)</label>
            <Input
              type="number"
              id="amh"
              step="0.1"
              value={formData.amh}
              onChange={(e) => setFormData({ ...formData, amh: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium">Weight (Kg)</label>
            <Input
              type="number"
              id="weight"
              step="0.1"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button type="submit">Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DrawerClose>
          </div>
        </form>
    </ScrollArea>
  );
};

// Updated AssessDrawer Component
const AssessDrawer = () => {
  return (
    <>
      {/* Desktop button - normal flow */}
      <Drawer>
        <DrawerTrigger className="bg-foreground text-background px-3 py-1 rounded-sm gap-2 items-center hidden md:flex">
          <Plus size={17} />Assess
        </DrawerTrigger>
        <DrawerContent>
          <ContentWrapper className="max-w-sm">
            <DrawerHeader>
              <DrawerTitle>PCOS Assessment</DrawerTitle>
              <DrawerDescription>Fill out the form to assess PCOS risk. Consult a healthcare professional for diagnosis.</DrawerDescription>
            </DrawerHeader>
            <PcosAssessmentForm />
          </ContentWrapper>
        </DrawerContent>
      </Drawer>

      {/* Mobile floating button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Drawer>
          <DrawerTrigger className="bg-foreground text-background px-4 py-3 rounded-full gap-2 items-center flex shadow-lg hover:shadow-xl transition-shadow">
            <Plus size={20} />
            <span className="text-sm font-medium">Assess</span>
          </DrawerTrigger>
          <DrawerContent>
            <ContentWrapper className="max-w-sm">
              <DrawerHeader>
                <DrawerTitle>PCOS Assessment</DrawerTitle>
                <DrawerDescription>Fill out the form to assess PCOS risk. Consult a healthcare professional for diagnosis.</DrawerDescription>
              </DrawerHeader>
              <ScrollArea>
                  <PcosAssessmentForm />
              </ScrollArea>
            </ContentWrapper>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default AssessDrawer;