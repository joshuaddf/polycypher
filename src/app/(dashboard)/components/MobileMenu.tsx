"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { dashBoardNavLinks } from '@/app/utils/data'



const MobileMenu = ({ isOpen, toggleMenu }: { isOpen: boolean, toggleMenu: () => void }) => {

  return (
    <>
    <button onClick={toggleMenu} className='flex items-center justify-center'>
      <div className="flex flex-col justify-center items-center gap-1 w-5 h-5">
        <span className={`w-5 h-0.5 bg-foreground transition-all duration-300 rounded-full ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
        {/* <span className={`w-7 h-0.5 bg-foreground transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span> */}
        <span className={`w-5 h-0.5 bg-foreground transition-all duration-300 rounded-full ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
      </div>
    </button>
    {/* {isOpen && <Menu isOpen={isOpen} toggleMenu={toggleMenu} /> } */}
    </>
  )
}

const Menu = ({ isOpen, toggleMenu }: { isOpen: boolean, toggleMenu: () => void }) => {
  const pathname = usePathname();

  return (
    <div className={`w-full absolute top-10 left-0 mt-2 p-4 z-50 ${isOpen ? "h-full" : "h-0"}`}>
      <div className="flex flex-col gap-2">
        {dashBoardNavLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            onClick={toggleMenu}
            className={`px-3 py-2 rounded-md transition-colors ${pathname === link.href
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
              }`}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
export default MobileMenu