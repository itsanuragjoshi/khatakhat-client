import styles from "./menu.module.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import MenuButton from "./MenuButton";

import Logo from "@mui/icons-material/AccountBalanceWalletOutlined";
import DashboardIcon from "@mui/icons-material/HomeOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import SellIcon from "@mui/icons-material/SellOutlined";
import SigninIcon from "@mui/icons-material/LoginOutlined";
import SignupIcon from "@mui/icons-material/HowToRegOutlined";
import SignoutIcon from "@mui/icons-material/LogoutOutlined";
import AccountIcon from "@mui/icons-material/AccountCircleOutlined";
import OrgIcon from "@mui/icons-material/BusinessOutlined";

const navListPublic = [
  {
    to: "/signin",
    icon: <SigninIcon />,
    title: "Sign In",
  },
  {
    to: "/signup",
    icon: <SignupIcon />,
    title: "Sign Up",
  },
];

const navListPrivate = [
  // {
  //   to: "/dashboard",
  //   icon: <DashboardIcon />,
  //   title: "Dashboard",
  // },
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
      // {
      //   to: "/paymentsreceived",
      //   title: "Payments Received",
      //   new: true,
      // },
    ],
  },
  {
    icon: <SettingsIcon />,
    title: "Settings",
    subNavList: [
      {
        to: "/settings/orgprofile",
        title: "Profile",
      },
      {
        to: "/org/select",
        title: "Select Organization",
      },
      // {
      //   to: "/settings/currencies",
      //   title: "Currencies",
      // },
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

const signOutItem = {
  to: "/signout",
  icon: <SignoutIcon />,
  title: "Sign Out",
};

const Menu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSubNavIndex, setOpenSubNavIndex] = useState(null);

  const { accessToken, userInfo, userRoles } = useSelector(
    (state) => state.auth
  );

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

      {userInfo && (
        <div className={styles.wrapper}>
          <div
            className={`${collapsed ? styles.collapsed : ""}`}
            title={userInfo.userName}
          >
            <div className={styles.innerWrapper} onClick={expandMenu}>
              <AccountIcon />
              {!collapsed && (
                <div>
                  <span>{userInfo.userName}</span>
                  <small>{userInfo.userEmail}</small>
                </div>
              )}
            </div>
          </div>
          {userRoles && (
            <div
              className={`${collapsed ? styles.collapsed : ""}`}
              title={userRoles?.orgId?.orgName}
            >
              <div className={styles.innerWrapper} onClick={expandMenu}>
                <OrgIcon />
                {!collapsed && (
                  <div>
                    <span>{userRoles?.orgId?.orgName}</span>
                    <small>Role: {userRoles?.roleId?.roleName}</small>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {!accessToken ? (
            <>
              {navListPublic?.map((item, i) => (
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
              <li></li>
            </>
          ) : userRoles ? (
            <>
              {navListPrivate?.map((item, i) => (
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
            </>
          ) : (
            <li title={signOutItem.title} className={styles.navItem}>
              <MenuButton
                to={signOutItem.to}
                icon={signOutItem.icon}
                title={signOutItem.title}
                collapsed={collapsed}
                expandMenu={expandMenu}
              />
            </li>
          )}
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
