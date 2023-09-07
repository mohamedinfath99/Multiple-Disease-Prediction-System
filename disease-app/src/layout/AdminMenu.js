import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import {
  PlusOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import 'antd/dist/reset.css';
import '../index.css';

const AdminMenu = () => {
  const menuItems = [
    {
      key: 'diabetes_disease',
      icon: <PlusOutlined />,
      text: 'Diabetes Disease',
      link: '/diabetesDisease',
      style: { textDecoration: "none", textTransform: 'uppercase', letterSpacing: '2px' },
      iconStyle: "m-3 center-content",
      styleMenu: { width: "90%", marginLeft: "15px" }
    },
    {
      key: 'heart_disease',
      icon: <PlusOutlined />,
      text: 'Heart Disease',
      link: '/heartDisease',
      style: { textDecoration: "none", textTransform: 'uppercase', letterSpacing: '2px' },
      iconStyle: "m-3 center-content",
      styleMenu: { width: "90%", marginLeft: "15px" }
    },
    {
      key: 'parkinson_disease',
      icon: <AppstoreOutlined />,
      text: 'Parkinson Disease',
      link: '/parkinsonDisease',
      style: { textDecoration: "none", textTransform: 'uppercase', letterSpacing: '2px' },
      iconStyle: "m-3 center-content",
      styleMenu: { width: "90%", marginLeft: "15px" }
    },
    {
      key: 'user_account',
      icon: <OrderedListOutlined />,
      text: 'User Account',
      link: '#',
      style: { textDecoration: "none", textTransform: 'uppercase', letterSpacing: '2px' },
      iconStyle: "m-3 center-content",
      styleMenu: { width: "90%", marginLeft: "15px" }
    },
    {
      key: 'logout',
      icon: <ShoppingOutlined />,
      text: 'Logout',
      link: '/',
      style: { textDecoration: "none", textTransform: 'uppercase', letterSpacing: '2px' },
      iconStyle: "m-3 center-content",
      styleMenu: { width: "90%", marginLeft: "15px" }
    },
  ];

  return (
    <>
      <Menu theme="dark" mode="vertical" className="dashboard-menu rounded">
        <h4 className="menu-heading text-center mt-8 mb-8 text-white" style={{ fontSize: '24px', fontWeight: '400', }}>USER DASHBOARD</h4>
        {menuItems.map(item => (
          <Menu.Item key={item.key} icon={item.icon} className={item.iconStyle} style={item.styleMenu}>
            <NavLink to={item.link} style={item.style}>{item.text}</NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
};

export default AdminMenu;