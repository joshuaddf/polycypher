import { links } from '@/utils/lib'
import Link from 'next/link'
import React from 'react'

const MobileMenu = ({ isOpen } : {  isOpen: boolean}) => {
  return (
    <div className={`absolute left-0 top-0 w-full bg-red-500 p-4 ${isOpen ? 'h-[8rem]' : 'h-0'} overflow-hidden transition-height duration-300 ease-in-out`}>
      <div className="">
        <ul className='flex flex-col items-end mt-8'>
        { links.map((link, i) => {
          return (
            <li key={i} className='w-full text-left'>
              <Link href={link.path}>{link.title}</Link>
            </li>
          )
        }) }
        </ul>
      </div>
    </div>
  )
}

export default MobileMenu;