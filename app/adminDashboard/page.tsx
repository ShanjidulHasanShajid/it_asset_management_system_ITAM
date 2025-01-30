import React from "react";
import { Button } from "@/components/ui/button";
import {
  Grid2X2,
  Settings,
  Users,
  BarChart2,
  LogOut,
  User,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const AdminDashboard = () => {
  const menuItems = [
    { id: 1, label: "Option A", icon: <Grid2X2 className="w-4 h-4 mr-2" /> },
    { id: 2, label: "Option B", icon: <Users className="w-4 h-4 mr-2" /> },
    { id: 3, label: "Option C", icon: <BarChart2 className="w-4 h-4 mr-2" /> },
    { id: 4, label: "Option D", icon: <Settings className="w-4 h-4 mr-2" /> },
  ];

  //get the data from session info
  const userProfile = {
    name: "John Doe",
    uid: "AD123456",
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo/Title Section */}
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <Separator />
        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Button variant="ghost" className="w-full justify-start">
                  {item.icon}
                  {item.label}
                </Button>
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
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-lg p-6 h-full">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to Admin Dashboard
          </h2>
          <p className="text-gray-600">
            Select an option from the sidebar to get started.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
