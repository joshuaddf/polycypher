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
        <>
            {/* Desktop button - normal flow */}
            <Drawer>
                <DrawerTrigger className="bg-foreground text-background px-3 py-1 rounded-sm gap-2 items-center hidden md:flex">
                    <Plus size={17} />Assess
                </DrawerTrigger>
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
        </>
    )
}

export default AssessDrawer