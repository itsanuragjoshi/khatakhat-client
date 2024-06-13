import styles from './menu.module.css';
import Dashboard from '@mui/icons-material/HomeOutlined';
import Settings from '@mui/icons-material/SettingsOutlined';
import ArrowBack from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForward from '@mui/icons-material/ArrowForwardIosOutlined';
import Logo from '@mui/icons-material/AccountBalanceWalletOutlined';
import Sell from '@mui/icons-material/SellOutlined';

import MenuButton from './MenuButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const navList = [
  {
    to: "/dashboard",
    icon: <Dashboard />,
    title: "Dashboard",
  },
  {
    icon: <Sell />,
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
    icon: <Settings />,
    title: "Settings",
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
      <div className={`${styles.logoWrapper} ${collapsed ? styles.collapsed : ''}`} title='KhataKhat'>
        <Link to='/dashboard' onClick={expandMenu}>
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
        title={collapsed ? 'Show Side Panel' : 'Hide Side Panel'}
        onClick={toggleMenu}
      >
        {collapsed ? <ArrowForward /> : <ArrowBack />}
      </div>
    </menu>
  );
};

export default Menu;
