import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
