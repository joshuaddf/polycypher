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
import PcosAssessmentForm from "./PcosAssessmentForm";

const AssessDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden md:block">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Assessment
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>PCOS Assessment</DrawerTitle>
              <DrawerDescription>
                Complete your PCOS assessment to track your symptoms and health metrics.
              </DrawerDescription>
            </DrawerHeader>
            <PcosAssessmentForm />
          </DrawerContent>
        </Drawer>
      </div>

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
                <DrawerDescription>Fill out the form to assess PCOS risk.</DrawerDescription>
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