
export const Button = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <button className=' px-4 md:px-6 py-1 text-sm rounded-xs'>{children}</button>
    )
}