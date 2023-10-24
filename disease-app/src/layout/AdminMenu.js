import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Button, message } from "antd";
import {
    QrcodeOutlined,
    SlackOutlined,
    LogoutOutlined,
    RedEnvelopeOutlined,
    OrderedListOutlined,
} from "@ant-design/icons";
import 'antd/dist/reset.css';
import '../index.css';

const AdminMenu = () => {
    const menuItems = [
        {
            key: 'diabetes_disease_details',
            icon: <SlackOutlined />,
            text: 'Diabetes Disease Details',
            link: '/adminDashboard',
            style: { textDecoration: "none", textTransform: 'uppercase', letterSpacing: '2px' },
            iconStyle: "m-3 center-content",
            styleMenu: { width: "90%", marginLeft: "15px" }
        },
        {
            key: 'heart_disease_details',
            icon: <QrcodeOutlined />,
            text: 'Heart Disease Details',
            link: '/heartDiseaseDetails',
            style: { textDecoration: "none", textTransform: 'uppercase', letterSpacing: '2px' },
            iconStyle: "m-3 center-content",
            styleMenu: { width: "90%", marginLeft: "15px" }
        },
        {
            key: 'parkinson_disease_details',
            icon: <RedEnvelopeOutlined />,
            text: 'Parkinson Disease Details',
            link: '/parkinsonDiseaseDetails',
            style: { textDecoration: "none", textTransform: 'uppercase', letterSpacing: '2px' },
            iconStyle: "m-3 center-content",
            styleMenu: { width: "90%", marginLeft: "15px" }
        },
        {
            key: 'admin_account',
            icon: <OrderedListOutlined />,
            text: 'Admin Account',
            link: '/adminAccount',
            style: { textDecoration: "none", textTransform: 'uppercase', letterSpacing: '2px' },
            iconStyle: "m-3 center-content",
            styleMenu: { width: "90%", marginLeft: "15px" }
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            text: 'Logout',
            link: '/logout', // Change the link to the logout route
            style: { textDecoration: "none", textTransform: 'uppercase', letterSpacing: '2px', padding: '0px', color: '#fff' },
            iconStyle: "m-3 center-content",
            styleMenu: { width: "90%", marginLeft: "15px" }
        },
    ];

    // const handleLogout = () => {
    //     fetch("http://127.0.0.1:5000/logout", {
    //         method: "GET",
    //         credentials: "include",
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             message.success("Logout successful");
    //             window.location.href = "/login";
    //             message.success("Logout successful");
    //         })
    //         .catch((error) => {
    //             console.error("Logout Error:", error);
    //         });
    // };


    const handleLogout = () => {
        document.cookie = "userrole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        window.location.href = "/login";

        message.success("Logout successful");
    };


    return (
        <>
            <Menu theme="dark" mode="vertical" className="dashboard-menu rounded">
                <h4 className="menu-heading text-center mt-8 mb-8 text-white" style={{ fontSize: '24px', fontWeight: '400', }}>ADMIN DASHBOARD</h4>
                {menuItems.map(item => (
                    <Menu.Item key={item.key} icon={item.icon} className={item.iconStyle} style={item.styleMenu}>
                        {item.key === 'logout' ? (
                            <Button type="link" onClick={handleLogout} style={item.style}>{item.text}</Button>
                        ) : (
                            <NavLink to={item.link} style={item.style}>{item.text}</NavLink>
                        )}
                    </Menu.Item>
                ))}
            </Menu>
        </>
    );
};

export default AdminMenu;