'use client'
import { Button, NavButton } from '@/app/components/Button'
import Link from 'next/link'
import React, { useState } from 'react'
import { links } from '@/utils/lib'
import MobileMenu from './MobileMenu'

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className='flex justify-between items-center z-50 relative bg-white h-[4rem] w-full px-3'>
                <div className="flex justify-between items-center gap-4">
                    <span>
                        <Link href="/" className='text-lg'>Logo</Link>
                    </span>
                    <span className='hidden md:px-20 lg:px-32 md:block'>|</span>
                    <div className="hidden md:block">
                        <ul>
                            {links.map((link, index) => (
                                <li key={index} className=' text-sm capitalize'>
                                    <Link href={link.path}>{link.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex items-center gap-5 justify-center">
                    <Button>Get Started</Button>
                    <NavButton isOpen={isOpen} setIsOpen={setIsOpen} />

                </div>
            </nav>
          {isOpen && <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
        </>
    )
}

export default Navbar