"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import EquipmentForm from "@/components/ui/assetForm";
import {
  House,
  PackagePlus,
  UserRoundPlus,
  ScanSearch,
  LogOut,
  User,
  CirclePlus,
  Menu,
  ClipboardPlus,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const UpdateAsset = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "",
    uid: "",
  });
  const router = useRouter();

  // Authentication and user profile check
  useEffect(() => {
    const checkAuth = () => {
      const dept = sessionStorage.getItem("dept");
      const userId = sessionStorage.getItem("userId");
      const userName = sessionStorage.getItem("userName");

      if (!dept || dept !== "Super Admin") {
        // Clear session storage
        sessionStorage.clear();
        // Prevent going back
        window.history.pushState(null, "", "/");
        router.push("/");
        return false;
      }

      // Update user profile from session storage
      setUserProfile({
        name: userName || "",
        uid: userId || "",
      });

      return true;
    };

    // Initial auth check
    const authStatus = checkAuth();
    setIsAuthenticated(authStatus);

    // Add event listener for popstate (browser back/forward)
    const handlePopState = () => {
      const authStatus = checkAuth();
      if (!authStatus) {
        // Prevent going back if not authenticated
        window.history.pushState(null, "", "/");
        router.push("/");
      }
    };

    window.addEventListener("popstate", handlePopState);

    // Clean up
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  // Handle logout
  const handleLogout = () => {
    sessionStorage.clear();
    window.history.pushState(null, "", "/");
    router.push("/");
  };

  const menuItems = [
    {
      id: 1,
      label: "Home",
      icon: <House className="w-4 h-4 mr-2" />,
      goto: "/superAdminDashboard",
    },
    {
      id: 2,
      label: "Asset Administration",
      icon: <CirclePlus className="w-4 h-4 mr-2" />,
      goto: "/superAdminDashboard/assetAdministration",
    },
    {
      id: 3,
      label: "User Administration",
      icon: <UserRoundPlus className="w-4 h-4 mr-2" />,
      goto: "/superAdminDashboard/userAdministration",
    },
    {
      id: 4,
      label: "Add Brand & Model",
      icon: <PackagePlus className="w-4 h-4 mr-2" />,
      goto: "/superAdminDashboard/brands",
    },
    {
      id: 5,
      label: "Update Asset List",
      icon: <ClipboardPlus className="w-4 h-4 mr-2" />,
      goto: "/superAdminDashboard/updateAsset",
    },
    {
      id: 6,
      label: "View Assets",
      icon: <ScanSearch className="w-4 h-4 mr-2" />,
      goto: "/superAdminDashboard/viewAsset",
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md hover:bg-slate-100"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 
          transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          w-72 bg-white shadow-lg flex flex-col z-40 border-r border-slate-200
        `}
      >
        {/* Dashboard Title */}
        <div className="p-6 bg-gradient-to-r from-slate-50 to-white">
          <h1 className="text-xl font-semibold text-slate-800">
            Super Admin Dashboard
          </h1>
        </div>
        <Separator className="opacity-50" />

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link href={item.goto}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile Section */}
        <div className="p-4 bg-slate-50">
          <Separator className="mb-4 opacity-50" />
          <div className="flex items-center space-x-3 mb-4 p-2 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">
                {userProfile.name}
              </p>
              <p className="text-xs text-slate-500">UID: {userProfile.uid}</p>
            </div>
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-slate-200 p-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            Update Asset List
          </h2>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-slate-800 mb-4">
                Fill out the form to add assets to the database
              </h3>
              <div className="bg-slate-50 rounded-lg p-4">
                <EquipmentForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default UpdateAsset;
