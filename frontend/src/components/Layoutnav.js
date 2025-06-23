// src/components/Layout.js
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '220px', width: '100%' }}>
                <Navbar />
                <main style={{ padding: '20px' }}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
