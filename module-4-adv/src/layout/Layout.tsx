import { Outlet } from 'react-router-dom'
import  Navbar  from '../components/Navbar'

const Layout = () => {

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center h-screen">
                <Outlet />
            </div>

            <div>Footer</div>
        </div>
    )
}

export default Layout
