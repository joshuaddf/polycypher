import Navbar from "./components/Navbar";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="max-w-[1440px] mx-auto p-4">
            <Navbar />
            <div className="">
            {children}
            </div>
        </div>
    );
}
