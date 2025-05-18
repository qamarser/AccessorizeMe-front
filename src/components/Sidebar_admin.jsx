import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  faLeaf, faTachometerAlt, faCogs,
  faBox, faList, faUsers, faStar, faPercent, faComment,
  faSignOutAlt, faUserCircle,faTruckFast
} from '@fortawesome/free-solid-svg-icons';

const Sidebar_admin = ({ sidebarCollapsed, setActiveTab, darkMode, activeTab }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path, tab) => {
    setActiveTab(tab);
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const handleLogout = () => {
    // Placeholder logout logic, replace with actual logout function
    console.log('Logout clicked');
    // For example: authContext.logout();
    navigate('/login');
  };

  const activeClass = 'bg-[#D63384] text-white';
  const inactiveClass = darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100';

  const navItems = [
    {
      tab: "dashboard",
      icon: faTachometerAlt,
      label: "Dashboard",
      path: "/admin/dashboard",
    },

    {
      tab: "orders",
      icon: faBox,
      label: "Orders",
      path: "/admin/dashboard/orders",
    },
    {
      tab: "shippment",
      icon: faTruckFast,
      label: "shipment",
      path: "/admin/dashboard/shipping",
    },
    {
      tab: "categories",
      icon: faList,
      label: "Categories",
      path: "/admin/dashboard/category",
    },
    {
      tab: "products",
      icon: faLeaf,
      label: "Products",
      path: "/admin/dashboard/products",
    },
    {
      tab: "users",
      icon: faUsers,
      label: "Users",
      path: "/admin/dashboard/users",
    },
    {
      tab: "reviews",
      icon: faStar,
      label: "Reviews",
      path: "/admin/dashboard/reviews",
    },
    // { tab: 'discounts', icon: faPercent, label: 'Discounts', path: '/dashboard/discounts' },
    // { tab: 'messages', icon: faComment, label: 'Messages', path: '/dashboard/messages' },
    // {
    //   tab: "settings",
    //   icon: faCogs,
    //   label: "Settings",
    //   path: "/admin/dashboard/settings",
    // },
  ];

  return (
    <div
      className={`${
        sidebarCollapsed ? "w-20" : "w-64"
      } bg-[#9EA0A2] shadow-lg transition-all duration-300 fixed h-full z-10 flex flex-col justify-between`}
    >
      {/* Navigation */}
      <img src="/Logo.svg" />
      <nav className="mt-6 flex-grow">
        {navItems.map(({ tab, icon, label, path }) => (
          <Link to={path} key={tab}>
            <div
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer flex items-center p-4 ${
                sidebarCollapsed ? "justify-center" : ""
              } ${activeTab === tab ? activeClass : inactiveClass}`}
            >
              <FontAwesomeIcon icon={icon} />
              {!sidebarCollapsed && <span className="ml-4">{label}</span>}
            </div>
          </Link>
        ))}
      </nav>

      {/* Profile and Logout Section */}
      <div
        className={`border-t border-gray-300 p-4 ${
          sidebarCollapsed ? "flex justify-center" : "flex flex-col items-start"
        }`}
      >
        {/* <div
          onClick={() => navigate('/profile')}
          className={`cursor-pointer flex items-center mb-4 ${sidebarCollapsed ? 'justify-center' : ''} ${inactiveClass}`}
        >
          <FontAwesomeIcon icon={faUserCircle} size="lg" />
          {!sidebarCollapsed && <span className="ml-4">Profile</span>}
        </div> */}
        <div
          onClick={handleLogout}
          className={`cursor-pointer flex items-center ${
            sidebarCollapsed ? "justify-center" : ""
          } ${inactiveClass}`}
        >
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          {!sidebarCollapsed && <span className="ml-4">Logout</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar_admin;
