"use client";

import React from "react";
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
import TableView from "@/components/ui/tableView";
import AddEquipment from "@/components/ui/addEquipment";
import AddUser from "@/components/ui/addUser";

const dummyData = [
  {
    userID: "EQ001",
    userName: "Dell Laptop",
    password: "1234",
    teamID: "teamID",
  },
  {
    userID: "EQ001",
    userName: "Dell Laptop",
    password: "1234",
    teamID: "teamID",
  },
  {
    userID: "EQ001",
    userName: "Dell Laptop",
    password: "1234",
    teamID: "teamID",
  },
  {
    userID: "EQ001",
    userName: "Dell Laptop",
    password: "1234",
    teamID: "teamID",
  },
  {
    userID: "EQ001",
    userName: "Dell Laptop",
    password: "1234",
    teamID: "teamID",
  },
  {
    userID: "EQ001",
    userName: "Dell Laptop",
    password: "1234",
    teamID: "teamID",
  },
  {
    userID: "EQ001",
    userName: "Dell Laptop",
    password: "1234",
    teamID: "teamID",
  },
];
const columns = [
  { key: "userID", label: "User ID" },
  { key: "userName", label: "User Name" },
  { key: "password", label: "Password" },
  { key: "teamID", label: "Team ID" },
];

const UserAdministration = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

  const userProfile = {
    name: "John Doe",
    uid: "AD123456",
  };

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
          <h1 className="text-xl font-bold">Super Admin Dashboard</h1>
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
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <div className="flex-1 p-8 lg:p-8 pt-20 lg:pt-8 overflow-hidden">
          {/* mother div for table view */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-full overflow-auto">
            <h2 className="text-2xl font-semibold mb-4">User Administration</h2>
            <p className="text-gray-600">
              Add Delete Users and Manage asset access.
            </p>
            <AddUser />
            <div className="overflow-auto mt-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Users Table
                </h3>
                <div className="border rounded-lg overflow-hidden bg-white h-164 overflow-y-auto">
                  <TableView data={dummyData} columns={columns} onDelete />
                </div>
              </div>
            </div>
          </div>
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

export default UserAdministration;
