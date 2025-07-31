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

const AssessDrawer = () => {
    return (
        <div>

            <Drawer>
                <DrawerTrigger>Open</DrawerTrigger>
                <DrawerContent>
                    <ContentWrapper className="max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                            <DrawerDescription>This action cannot be undone.</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <Button>Submit</Button>
                                <Button variant="outline">Cancel</Button>
                        </DrawerFooter>
                    </ContentWrapper>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default AssessDrawer