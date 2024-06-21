import styles from "./menu.module.css";
import Logo from "@mui/icons-material/AccountBalanceWalletOutlined";
import DashboardIcon from "@mui/icons-material/HomeOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import SellIcon from "@mui/icons-material/SellOutlined";
import SigninIcon from "@mui/icons-material/LoginOutlined";
import SignupIcon from "@mui/icons-material/HowToRegOutlined";
import SignoutIcon from "@mui/icons-material/LogoutOutlined";

import MenuButton from "./MenuButton";
import { useState } from "react";
import { Link } from "react-router-dom";

const navList = [
  {
    to: "/signin",
    icon: <SigninIcon />,
    title: "Sign In",
  },
  {
    to: "/getstarted",
    icon: <SignupIcon />,
    title: "Sign Up",
  },
  {
    to: "/dashboard",
    icon: <DashboardIcon />,
    title: "DashboardIcon",
  },
  {
    icon: <SellIcon />,
    title: "Sales",
    subNavList: [
      {
        to: "/customers",
        title: "Customers",
        new: true,
      },
      {
        to: "/invoices",
        title: "Invoices",
        new: true,
      },
      {
        to: "/paymentsreceived",
        title: "Payments Received",
        new: true,
      },
    ],
  },
  {
    icon: <SettingsIcon />,
    title: "SettingsIcon",
    subNavList: [
      {
        to: "/settings/orgprofile",
        title: "Profile",
      },
      {
        to: "/settings/currencies",
        title: "Currencies",
      },
      {
        to: "/settings/users",
        title: "Users",
      },
    ],
  },
  {
    to: "/signout",
    icon: <SignoutIcon />,
    title: "Sign Out",
  },
];

const Menu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSubNavIndex, setOpenSubNavIndex] = useState(null);

  const toggleMenu = () => {
    setCollapsed(!collapsed);
    if (!collapsed) {
      setOpenSubNavIndex(null); // Close all submenus when the panel is collapsed
    }
  };

  const handleSubNav = (index) => {
    setOpenSubNavIndex(openSubNavIndex === index ? null : index);
  };

  const expandMenu = () => {
    setCollapsed(false);
  };

  return (
    <menu className={collapsed ? styles.collapsed : undefined}>
      <div
        className={`${styles.logoWrapper} ${collapsed ? styles.collapsed : ""}`}
        title="KhataKhat"
      >
        <Link to="/dashboard" onClick={expandMenu}>
          <Logo />
          {!collapsed && <span>KhataKhat</span>}
        </Link>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navList.map((item, i) => (
            <li key={i} title={item.title} className={styles.navItem}>
              <MenuButton
                to={item.to}
                icon={item.icon}
                title={item.title}
                subNavList={item.subNavList}
                collapsed={collapsed}
                open={openSubNavIndex === i}
                handleSubNav={() => handleSubNav(i)}
                expandMenu={expandMenu}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={styles.collapseBtnWrapper}
        title={collapsed ? "Show Side Panel" : "Hide Side Panel"}
        onClick={toggleMenu}
      >
        {collapsed ? <ArrowForwardIcon /> : <ArrowBackIcon />}
      </div>
    </menu>
  );
};

export default Menu;
