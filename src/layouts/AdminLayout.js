import React from 'react'
import { Outlet } from 'react-router-dom';
import SideNav from '../components/layouts/adminLayout/SideNav';
export default function AdminLayout({ children }) {
    return (
        <div className='min-h-screen bg-blue-gray-50/50 w-full'>
            <SideNav />
            <div className="p-4 xl:ml-80">
                <Outlet />
            </div>
        </div>
    )
}
