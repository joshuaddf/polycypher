
export const Button = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <button className='bg-primary px-4 md:px-6 py-1 text-sm rounded-xs'>{children}</button>
    )
}

export const NavButton = ({ isOpen, setIsOpen }: Readonly<{ isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }>) => {
    return (
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col items-center justify-center relative w-6 h-5 focus:outline-none"
            aria-label="Toggle navigation menu"
        >
            <span
                className={`w-5 bg-black h-0.5 absolute top-1/2 transform transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'
                    }`}
            ></span>
            <span
                className={`w-5 bg-black h-0.5 absolute top-1/2 transform transition-transform duration-300 ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'
                    }`}
            ></span>
        </button>
    )
}
