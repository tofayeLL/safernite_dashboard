"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IoClose /* IoLocationSharp */ } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import Cookies from "js-cookie";
import logo from "@/assets/logo.png";
import { RxDashboard } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";

import { IoSettingsOutline } from "react-icons/io5";
// import { PiBookOpenFill } from "react-icons/pi";

import { FaUsersRectangle } from "react-icons/fa6";
// import { LuMessageCircleMore } from "react-icons/lu";
// import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { TbUserScan } from "react-icons/tb";
import { CgNotes } from "react-icons/cg";
import { CalendarClock } from "lucide-react";
import { LiaShippingFastSolid } from "react-icons/lia";

// Sidebar Props
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const NavbarSlider = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const path = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const navigation = [
    { label: "Dashboard", route: "/", iconPath: <RxDashboard /> },

    {
      label: "User Management",
      route: "/admin/user-Management",
      iconPath: <TbUserScan className="h-5 w-5" />,
    },
    {
      label: "Post Management",
      route: "/admin/post-Management",
      iconPath: <FaUsersRectangle className="h-5 w-5" />,
    },
    {
      label: "Leaderboard Overview",
      route: "/admin/leaderboard-Overview",
      iconPath: <CgNotes className="w-5 h-5" />,
    },

    {
      label: "Donation History",
      route: "/admin/donation-History",

      iconPath: <CalendarClock className="w-5 h-5" />,
    },
    {
      label: "Shipping Management",
      route: "/admin/shipping-Management",
      iconPath: <LiaShippingFastSolid className="w-5 h-5" />,
    },

    /* {
      label: "Notification",
      route: "/notification",
      iconPath: <IoSettingsOutline className="h-5 w-5" />,
    }, */
    {
      label: "Settings",
      route: "/settings",
      iconPath: <IoSettingsOutline className="h-5 w-5" />,
    },
  ];

  const handleLogOut = () => {
    dispatch(logout());
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <div className="h-screen bg-white">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="m-4 p-2 text-black rounded-md bg-white shadow-md lg:hidden"
      >
        {isOpen ? <IoClose size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Sidebar Content */}
      <aside
        className={`duration-300 flex flex-col justify-between h-[calc(100%-0px)] font-inter ${
          isOpen ? "w-[320px]" : "w-[80px]"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          {isOpen && (
            <Link href="/" className="hidden lg:flex justify-start px-6">
              <div className="flex justify-start items-center gap-3">
                <Image
                  width={250}
                  height={250}
                  className="w-10 h-10 object-cover object-center"
                  src={logo}
                  alt="logo_image"
                  priority
                />
                <p className="lg:text-4xl text-2xl font-bold bg-gradient-to-r from-[#11E8DB] to-[#D08087] bg-clip-text text-transparent py-6">
                  FateForge
                </p>
              </div>
            </Link>
          )}

          <div className={`flex flex-col ${isOpen ? "pt-0" : ""}`}>
            {/* Navigation */}
            <ul className="m-4 lg:m-6">
              {navigation.map((item) => (
                <li key={item?.route}>
                  <Link
                    href={item?.route}
                    className={`flex items-center gap-2 px-4 py-2 mb-2 rounded-lg hover:bg-[#08E9DB] hover:text-black transition-colors duration-300 ease-in-out 
                    ${
                      path === item?.route
                        ? "bg-[#08E9DB] text-black"
                        : "text-[#817F9B]"
                    }`}
                  >
                    <p className="w-5 h-5">{item?.iconPath}</p>
                    {isOpen && <p className="">{item?.label}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Spacer to push logout to bottom */}
          <div className="flex-grow"></div>

          {/* Logout Button */}
          <div className="mt-auto p-6">
            <button
              onClick={handleLogOut}
              className="flex items-center justify-start gap-2 text-[#D00E11] hover:text-red-400 transition-colors rounded-md bg-[#D00E111A] hover:bg-[#EF444433] w-full py-2 px-4"
            >
              <RiLogoutCircleRLine size={18} />
              {isOpen && <span className="text-lg">Log out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Modal */}
    </div>
  );
};

export default NavbarSlider;
