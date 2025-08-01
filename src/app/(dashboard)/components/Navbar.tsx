"use client"
import { dashBoardNavLinks } from '@/app/utils/data'
import { NavbarWrapper } from '@/app/components/Wrapper'
import Link from 'next/link'
import MobileMenu from './MobileMenu'
import { useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import NavDropdownMenu from './NavDropdownMenu'


interface NavbarProps {
    firstName: string;
    lastName: string;
    profilePicture: string;

}

const Navbar = ({ firstName, lastName, profilePicture }: NavbarProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className='flex justify-between items-center z-50 relative h-[4rem] w-full'>
            <NavbarWrapper className='flex justify-between items-center w-full px-3'>
                <div className="flex justify-between items-center gap-4">
                    <span>
                        <Link href="/" className='text-lg'>Logo</Link>
                    </span>
                    <span className='hidden md:px-20 lg:px-32 md:block'>|</span>
                    <div className="hidden md:flex flex-col items-start justify-end text-xl pt-5">
                        {
                            dashBoardNavLinks.map((link, index) => (
                                <Link key={index} href={link.href} className={` ${pathname === link.href ? "opacity-50  duration-300" : "text-foreground transition-all duration-300"}`}>{link.title}</Link>
                            ))
                        }
                    </div>
                </div>
                <div className="flex items-center justify-between gap-5">
                    {/* <div className="w-full">
                        <Image
                        src={profilePicture}
                        alt={firstName}
                        width={40}
                        height={40}
                        />
                    </div> */}
                    {/* <div className="bg-accent px-6 py-2 rounded-sm">{firstName} {lastName}</div> */}
                    <NavDropdownMenu />
                    <div className="flex md:hidden">
                        <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
                    </div>
                </div>
            </NavbarWrapper>
        </nav>
    )
}

export default Navbar