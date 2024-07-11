import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"

function Layout() {
    return (
        <>
            <main className="font-poppins">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout