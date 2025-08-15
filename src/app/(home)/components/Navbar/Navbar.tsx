"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { NavbarWrapper } from '@/app/components/Wrapper'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const Navbar = () => {

    const { isAuthenticated } = useKindeBrowserClient();

    return (
        <nav className='flex justify-between items-center z-50 relative h-[4rem] w-full px-3'>
            <NavbarWrapper className='flex justify-between items-center w-full px-3'>
                <div className="flex justify-between items-center gap-4">
                    <span>
                        <Link href="/" className='text-lg font-quicksand font-black'>PolyCypher</Link>
                    </span>
                    <span className='hidden md:px-20 lg:px-32 md:block'>|</span>
                    <div className="hidden md:flex flex-col items-start justify-end text-xl pt-5">
                        <span>Empowering PCOS Insights,</span>
                        <span className='opacity-50'>always at your fingertips.</span>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-5">
                    {isAuthenticated ? (
                        <>
                            <Button variant="secondary">
                                <Link href="/dashboard/clinical-portal">Dashboard</Link>
                            </Button>
                            <Button variant="outline">
                                <LogoutLink>Log out</LogoutLink>
                            </Button>
                        </>
                    ) : (
                        <Button>
                            <RegisterLink>Sign Up</RegisterLink>
                        </Button>
                    )
                    }
                </div>
            </NavbarWrapper>
        </nav>
    )
}

export default Navbar