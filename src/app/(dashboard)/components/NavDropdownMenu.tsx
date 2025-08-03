"use client"
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";

export default function NavDropdownMenu() {

  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3">
          {/* <Button variant="outline">{user?.given_name} {user?.family_name}</Button> */}
          <Image className="rounded-full"
            src={user?.picture ?? "vercel.svg"}
            width={35}
            height={35}
            alt="Profile Picture"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuLabel className="text-xs text-left text-muted-foreground">{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col items-start justify-between gap-2">
          <div className="w-full flex flex-col items-start justify-between">
            <DropdownMenuSeparator className="my-1" />
            <div className="flex items-center justify-between w-full gap-2">
              <DropdownMenuItem>
                <LogoutLink>Log out</LogoutLink>
              </DropdownMenuItem>
              <ModeToggle />
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
