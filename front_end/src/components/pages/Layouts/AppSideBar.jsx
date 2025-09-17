// AppSidebar.jsx
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from "react-pro-sidebar";
import { NavLink, useLocation } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUsers,
  FaUpload,
  FaUserCheck,
  FaMapMarkerAlt,
  FaHotel,
  FaBuilding,
  FaBed,
  FaMinusSquare,
  FaTimesCircle,
} from "react-icons/fa";

import { useTheme } from "../../../context/ThemeContext";
import "../../../App.css";

export default function AppSidebar({ collapsed, isMobile, onToggle }) {
  const { pathname } = useLocation();
  const { theme } = useTheme();

  // Define colors based on theme
  const colors = theme === "dark"
    ? {
        sidebarBg: "#101828",
        text: "white",
        hoverBg: "#374151",
        hoverText: "white",
        activeBg: "#111827",
        activeText: "#fbbf24",
      }
    : {
        sidebarBg: "linear-gradient(180deg, #7c3aed 0%, #d946ef 100%)",
        text: "white",
        hoverBg: "white",
        hoverText: "black",
        activeBg: "black",
        activeText: "white",
      };

  return (
    <aside
      className="fixed top-0 left-0 h-screen z-60 transition-all duration-300"
      style={{ width: collapsed ? 80 : 250 }}
    >
      <Sidebar
        collapsed={collapsed}
        backgroundColor="transparent"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            background: colors.sidebarBg,
            height: "100vh",
            borderRight: "0",
            color: colors.text,
          },
        }}
      >
        {/* Header / toggle */}
        <div className="flex items-center justify-between px-4 py-3">
          {!collapsed && !isMobile && (
            <span className="font-bold text-lg ps-2 font-serif">My App</span>
          )}
          <button onClick={onToggle} className="text-white hover:text-gray-300">
            {collapsed ? <FaMinusSquare size={22} /> : <FaTimesCircle size={22} />}
          </button>
        </div>

        {/* Menu items */}
        <Menu
          menuItemStyles={{
            button: {
              color: colors.text,
              borderRadius: 8,
              padding: "8px 12px",
              margin: "4px 12px",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: colors.hoverBg,
                color: colors.hoverText,
              },
              "&.active": {
                backgroundColor: colors.activeBg,
                color: colors.activeText,
                fontWeight: 700,
              },
            },
            subMenuContent: {
              backgroundColor: "transparent",
              paddingLeft: 8,
            },
          }}
        >
          {/* Dashboard */}
          <MenuItem icon={<FaTachometerAlt />} component={<NavLink to="/" />}>
            Dashboard
          </MenuItem>

          {/* Administration */}
          <SubMenu icon={<FaUsers />} label="Administration">
            <MenuItem
              icon={<FaUpload />}
              component={<NavLink to="/administration/uploads/list" />}
            >
              Upload Logs
            </MenuItem>
            <MenuItem
              icon={<FaUserCheck />}
              component={<NavLink to="/admin/master/hostellers/list" />}
            >
              Hostellers
            </MenuItem>
          </SubMenu>

          
        </Menu>
      </Sidebar>
    </aside>
  );
}
