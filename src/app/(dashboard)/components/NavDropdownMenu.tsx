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

  const { getUser } =  useKindeBrowserClient();
  const user = getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3">
        <Button variant="outline">{user?.given_name} {user?.family_name}</Button>
        <Image className="rounded-full"
        src={user?.picture ?? "vercel.svg"}
        width={30}
        height={30}
        alt="Profile Picture"
        />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start"> 
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="w-full flex items-center justify-between">
          <LogoutLink>Log out</LogoutLink>
          <ModeToggle />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
