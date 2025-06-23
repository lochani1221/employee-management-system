import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    // Paths where sidebar and navbar should NOT be shown
    const noSidebarPaths = ['/', '/login'];

    const hideSidebar = noSidebarPaths.includes(location.pathname);

    return (
        <div style={{ display: 'flex' }}>
            {!hideSidebar && <Sidebar />}
            <div style={{ marginLeft: hideSidebar ? '0' : '220px', width: '100%' }}>
                {!hideSidebar && <Navbar />}
                <main style={{ padding: '20px' }}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
