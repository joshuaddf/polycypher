import { Button } from '@/app/components/Button'
import Link from 'next/link'
import { NavbarWrapper } from '../../components/Wrapper'

const Navbar = () => {
    return (
        <footer className="bg-white flex justify-center items-center h-[15rem] md:h-[25rem]">
            <NavbarWrapper className="flex justify-between items-center w-full md:w-[75%] px-3">
                <div className="flex flex-col justify-start gap-2">
                    <Link href="/" className="text-lg font-semibold">
                        Logo
                    </Link>
                    <span className='opacity-70 text-xs bg-light-grey p-1'>Privacy Policy</span>
                </div>

                <div className="flex flex-col ">
                    <span>Empowering PCOS Insights,</span>
                    <span className="opacity-30">always at your fingertips.</span>
                </div>
            </NavbarWrapper>
        </footer>
    )
}

export default Navbar