import React from 'react'

export const NavbarWrapper = ({ children, className='' }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`max-w-[1440px] mx-auto ${className}`}>
            {children}
        </div>
    )
}

export const ContentWrapper = ({ children, className='' }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`max-w-[1260px] mx-auto px-4  ${className}`}>
            {children}
        </div>
    )
}