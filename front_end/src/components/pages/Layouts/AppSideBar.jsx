// AppSidebar.jsx
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaCogs,
  FaMinusSquare,
  FaTimesCircle,
} from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import {
  MdAdminPanelSettings,
  MdOutlineAdminPanelSettings,
  MdUpload,
} from "react-icons/md";
import { FaSuitcaseMedical } from "react-icons/fa6";
import { GoPersonAdd } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";

import { useTheme } from "../../../context/ThemeContext";
import "../../../App.css";


export default function AppSidebar({ collapsed, isMobile, onToggle }) {
  const { theme } = useTheme();

  const colors =
    theme === "dark"
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
      className={`fixed top-0 left-0 h-screen z-50 transition-all duration-300
        ${isMobile ? `w-${collapsed ? '0' : '64'} overflow-hidden` : ''}`}
      style={{
        width: isMobile ? (collapsed ? 0 : 250) : collapsed ? 80 : 250,
        background: isMobile ? colors.sidebarBg : "transparent",
      }}
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
            overflowY: "auto",
          },
        }}
      >
        {/* Header / toggle */}
        <div className="flex items-center justify-between px-4 py-3">
          {!collapsed && !isMobile && (
            <span className="font-bold text-lg ps-2 font-serif">Medi Track</span>
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
          <MenuItem icon={<FaTachometerAlt />} component={<NavLink to="/" />}>
            Dashboard
          </MenuItem>

          <SubMenu icon={<MdOutlineAdminPanelSettings />} label=" Administration">
            <SubMenu icon={<GoPersonAdd
            />} label="Employee Management ">
              <MenuItem icon={<IoIosArrowForward />} component={<NavLink to="administration/employee/list" />}>
                Employee
              </MenuItem>

            </SubMenu>
            <MenuItem
              icon={<MdAdminPanelSettings />}
              component={<NavLink to="administration/upload-log/list" />}
            >
              Upload Log
            </MenuItem>
          </SubMenu>

          <SubMenu icon={<FaCogs />} label="Master">
            <MenuItem
              icon={<GrMapLocation />}
              component={<NavLink to="master/location/list" />}
            >
              Location Master
            </MenuItem>
            <MenuItem
              icon={<FaSuitcaseMedical />}
              component={<NavLink to="master/medical/list" />}
            >
              Medical Master
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </aside>
  );
}

