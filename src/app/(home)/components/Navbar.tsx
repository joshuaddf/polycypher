import { Button } from '@/app/components/Button'
import Link from 'next/link'
import { NavbarWrapper } from './Wrapper'

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
                       <span className='opacity-30'>always at your fingertips.</span>
                    </div>
                </div>
                <Button>Get Started</Button>
            </NavbarWrapper>
        </nav>
    )
}

export default Navbar