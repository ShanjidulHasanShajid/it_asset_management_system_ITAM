"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TableView from "../../../components/ui/tableView";
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

const ViewAsset = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [items, setItems] = useState([]);
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

      if (!dept || dept !== "Admin") {
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
      goto: "/adminDashboard",
    },
    {
      id: 3,
      label: "User Administration",
      icon: <UserRoundPlus className="w-4 h-4 mr-2" />,
      goto: "/adminDashboard/userAdministration",
    },
    {
      id: 4,
      label: "Add Brand & Model",
      icon: <PackagePlus className="w-4 h-4 mr-2" />,
      goto: "/adminDashboard/brands",
    },
    {
      id: 5,
      label: "Update Asset List",
      icon: <ClipboardPlus className="w-4 h-4 mr-2" />,
      goto: "/adminDashboard/updateAsset",
    },
    {
      id: 6,
      label: "View Assets",
      icon: <ScanSearch className="w-4 h-4 mr-2" />,
      goto: "/adminDashboard/viewAsset",
    },
  ];

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/item");
      const data = await response.json();
      // Sort the data
      const sortedData = data.sort(
        (a: { item_id: string }, b: { item_id: string }) => {
          return a.item_id.localeCompare(b.item_id);
        }
      );
      setItems(sortedData);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

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
              <Menu className="w-5 h-5 text-blue-600" />
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
          <h2 className="text-2xl font-semibold text-slate-800">View Assets</h2>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <div className="flex-1 p-8 lg:p-8 pt-20 lg:pt-8 overflow-hidden">
            {/* mother div for table view */}
            <div className="bg-white rounded-lg shadow-lg p-6 h-full overflow-auto">
              <h2 className="text-2xl font-semibold mb-4">View Assets</h2>
              <p className="text-gray-600">
                Select an option from the sidebar to get started.
              </p>
              <p>
                <br></br>
              </p>
              <div className="overflow-auto">
                <TableView
                  data={items}
                  columns={[
                    { key: "item_id", label: "Item ID" },
                    { key: "item_name", label: "Item Name" },
                    { key: "equipment_name", label: "Equipment ID" },
                    { key: "item_variation", label: "Item Variation" },
                    { key: "brand_name", label: "Brand ID" },
                    { key: "model_name", label: "Model ID" },
                    { key: "manufacture_no", label: "Manufacture No" },
                    { key: "status_details", label: "Status Details" },
                    { key: "remarks", label: "Remarks" },
                    { key: "line_name", label: "Line Name" },
                    { key: "store_name", label: "Store Name" },
                    { key: "present_factory", label: "Present Factory" },
                    { key: "owner_factory", label: "Owner Factory" },
                    { key: "license_no", label: "License No" },
                    { key: "license_date", label: "License Date" },
                    { key: "rcv_no", label: "RCV No" },
                    { key: "invoice_no", label: "Invoice No" },
                    { key: "po_no", label: "PO No" },
                    { key: "vendor", label: "Vendor" },
                    { key: "unit_price", label: "Unit Price" },
                    { key: "currency", label: "Currency" },
                    { key: "physical_location", label: "Physical Location" },
                    { key: "ip_address", label: "IP Address" },
                    { key: "subnet_mask", label: "Subnet Mask" },
                    { key: "gateway", label: "Gateway" },
                    { key: "dns", label: "DNS" },
                    { key: "ethernet_details", label: "Ethernet Details" },
                    { key: "host_name", label: "Host Name" },
                    { key: "operating_system", label: "Operating System" },
                    { key: "platform", label: "Platform" },
                    { key: "provisioned_space", label: "Provisioned Space" },
                    { key: "used_space", label: "Used Space" },
                    { key: "memory_size", label: "Memory Size" },
                    { key: "ram_details", label: "RAM Details" },
                    { key: "cpu_model", label: "CPU Model" },
                    { key: "cpu_clock", label: "CPU Clock" },
                    { key: "ship_date", label: "Ship Date" },
                    { key: "start_date", label: "Start Date" },
                    { key: "expiration_date", label: "Expiration Date" },
                    { key: "platform", label: "Platform" },
                  ]}
                  onDelete={async (item) => {
                    try {
                      const response = await fetch(
                        `/api/item/${item.item_id}`,
                        {
                          method: "DELETE",
                        }
                      );
                      if (response.ok) {
                        fetchItems();
                      } else {
                        console.error("Failed to delete asset.");
                      }
                    } catch (error) {
                      console.error("Error deleting asset:", error);
                    }
                  }}
                  tableName="Asset"
                />
                ;
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
      </div>
    </div>
  );
};

export default ViewAsset;
