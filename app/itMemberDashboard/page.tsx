"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import Link from "next/link";

const SuperAdminDashboard = () => {
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

      if (!dept || dept !== "IT Member") {
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
      goto: "/itMemberDashboard",
    },

    {
      id: 5,
      label: "Update Asset List",
      icon: <ClipboardPlus className="w-4 h-4 mr-2" />,
      goto: "/itMemberDashboard/updateAsset",
    },
    {
      id: 6,
      label: "View Assets",
      icon: <ScanSearch className="w-4 h-4 mr-2" />,
      goto: "/itMemberDashboard/viewAsset",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Mobile Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden absolute top-4 left-4 z-50"
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
        w-64 bg-white shadow-lg flex flex-col z-40
      `}
      >
        {/* Logo/Title Section */}
        <div className="p-6 pl-16 lg:pl-6">
          {/* Added padding-left for spacing */}
          <h1 className="text-xl font-bold">IT User Dashboard</h1>
        </div>
        <Separator />
        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link href={item.goto}>
                  <Button variant="ghost" className="w-full justify-start">
                    {item.icon}
                    {item.label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile Section */}
        <div className="p-4">
          <Separator className="mb-4" />
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium">{userProfile.name}</p>
              <p className="text-xs text-gray-500">UID: {userProfile.uid}</p>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="p-4">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 lg:p-8 pt-20 lg:pt-8">
        <div className="bg-white rounded-lg shadow-lg p-6 h-full">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to IT User Dashboard
          </h2>
          <p className="text-gray-600">
            Select an option from the sidebar to get started.
          </p>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SuperAdminDashboard;
