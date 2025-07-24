import { Button } from '@/app/components/Button'
import Link from 'next/link'
import { NavbarWrapper } from './Wrapper'

const Navbar = () => {
    return (
        <footer className="bg-white flex flex-col justify-center items-center h-[25rem]">
            <div className='flex justify-between items-center w-full px-3'>
                <NavbarWrapper className='flex justify-between items-center w-full px-3'>
                    <div className="flex justify-between items-center gap-4">
                        <span>
                            <Link href="/" className='text-lg'>Logo</Link>
                        </span>
                        <span className='hidden md:px-20 lg:px-32 md:block'>|</span>
                        <div className="hidden md:block">
                            <span>Mini project</span>
                        </div>
                    </div>
                    <Button>Get Started</Button>
                </NavbarWrapper>
            </div>
            <div className="">
                <caption className='flex'>Privacy Policy</caption>
            </div>
        </footer>
    )
}

export default Navbar