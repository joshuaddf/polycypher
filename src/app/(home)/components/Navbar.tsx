"use client"
import Link from 'next/link'
import { NavbarWrapper } from '../../components/Wrapper'
import { Button } from '@/components/ui/button'
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center z-50 relative h-[4rem] w-full px-3'>
            <NavbarWrapper className='flex justify-between items-center w-full px-3'>
                <div className="flex justify-between items-center gap-4">
                    <span>
                        <Link href="/" className='text-lg'>Logo</Link>
                    </span>
                    <span className='hidden md:px-20 lg:px-32 md:block'>|</span>
                    <div className="hidden md:flex flex-col items-start justify-end text-xl pt-5">
                        <span>Empowering PCOS Insights,</span>
                        <span className='opacity-50'>always at your fingertips.</span>
                    </div>
                </div>
                    <Button size={'sm'}>
                        <RegisterLink>Get started</RegisterLink>
                    </Button>
            </NavbarWrapper>
        </nav>
    )
}

export default Navbar