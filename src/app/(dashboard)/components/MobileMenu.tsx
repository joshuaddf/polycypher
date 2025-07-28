import React from 'react'

const MobileMenu = ({ isOpen, toggleMenu } : { isOpen: boolean, toggleMenu: () => void }) => {
  return (
    <button onClick={toggleMenu}>
        <div className="flex flex-col justify-center items-center gap-1 w-7 h-7">
            <span className={`w-7 h-0.5  bg-black/35 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            {/* <span className='w-7 h-0.5 bg-black'></span> */}
            <span className={`w-7 h-0.5 bg-black/35 transition-all duration-300  ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </div>
    </button>
  )
}

export default MobileMenu