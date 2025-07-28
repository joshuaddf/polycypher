"use client"
import { dashBoardNavLinks } from '@/app/utils/data'
import { NavbarWrapper } from '@/app/components/Wrapper'
import Link from 'next/link'
import MobileMenu from './MobileMenu'
import { useState } from 'react'

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

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
                                <Link key={index} href={link.href} className='text-base'>{link.title}</Link>
                            ))
                        }
                    </div>
                </div>
                <div className="flex items-center justify-between gap-5">
                    <div className="">Profile</div>
                    <div className="flex md:hidden">
                        <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
                    </div>
                </div>
            </NavbarWrapper>
        </nav>
    )
}

export default Navbar