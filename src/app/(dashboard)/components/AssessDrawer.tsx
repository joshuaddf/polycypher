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

const AssessDrawer = () => {
    return (
        <div>

            <Drawer>
                <DrawerTrigger className="bg-foreground text-background px-3 py-1 rounded-sm  gap-2 items-center hidden md:flex"><Plus size={17} />Assess</DrawerTrigger>
                <DrawerTrigger className="bg-foreground text-background px-3 py-1 rounded-sm  gap-2 items-center flex text-sm md:text-base md:hidden"><Plus size={17} />Assess</DrawerTrigger>
                <DrawerContent>
                    <ContentWrapper className="max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                            <DrawerDescription>This action cannot be undone.</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <Button>Submit</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </ContentWrapper>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default AssessDrawer