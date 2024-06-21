import styles from "./menu.module.css";
import { NavLink } from "react-router-dom";
import ArrowDown from "@mui/icons-material/KeyboardArrowDownOutlined";

const MenuButton = ({
  to,
  icon,
  title,
  subNavList,
  collapsed,
  open,
  handleSubNav,
  expandMenu,
}) => {
  return (
    <>
      {subNavList === undefined ? (
        <NavLink to={to} className={styles.navLink} onClick={expandMenu}>
          {icon}
          {!collapsed && <span>{title}</span>}
        </NavLink>
      ) : (
        <>
          <div
            className={styles.navLink}
            onClick={() => {
              handleSubNav();
              expandMenu();
            }}
          >
            {icon}
            {!collapsed && <span>{title}</span>}
            {!collapsed && (
              <ArrowDown className={open ? styles.rotatedArrow : ""} />
            )}
          </div>
          {open && (
            <ul className={styles.subNavList}>
              {subNavList.map((subItem, j) => (
                <li key={j} title={subItem.title} className={styles.subNavItem}>
                  <NavLink
                    to={subItem.to}
                    className={styles.subNavLink}
                    onClick={expandMenu}
                  >
                    <span>{subItem.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default MenuButton;
