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

const dummyData = [
  {
    // itemId: "ITEM001",
    equipmentName: "EQ001",
    itemName: "Dell Laptop",
    modelId: "MOD001",
    tagId: "TAG001",
    manufactureNo: "MFG123456",
    statusDetails: "Active",
    lineName: "IT Equipment",
    storeName: "Main Store",
    presentFactory: "Factory A",
    licenseNo: "LIC001",
    licenseDate: "2024-01-01",
    rcvNo: "RCV001",
    invoiceNo: "INV001",
    poNo: "PO001",
    supplier: "Dell Inc.",
    ownerFactory: "Factory A",
    vendorName: "Dell Distribution",
    unitPrice: "1200.00",
    currency: "USD",
    physicalLocation: "Floor 2, Room 201",
    ipAddress: "192.168.1.100",
    hostName: "DELL-LAT5420",
    operatingSystem: "Windows 11 Pro",
    provisionedSpace: "512GB",
    usedSpace: "256GB",
    memorySize: "512GB SSD",
    ramDetails: "16GB DDR4",
    cpuModel: "Intel i7-1185G7",
    cpuClock: "3.0GHz",
    ethernetDetails: "1Gbps",
    shipDate: "2023-12-15",
    startDate: "2024-01-01",
    expirationDate: "2027-01-01",
    subnetMask: "255.255.255.0",
    gateway: "192.168.1.1",
    dns: "8.8.8.8",
    platform: "Windows",
    remarks: "Executive laptop",
  },
  {
    // itemId: "ITEM002",
    equipmentName: "EQ002",
    itemName: "HP Server",
    itemVariation: "ProLiant DL380",
    modelId: "MOD002",
    tagId: "TAG002",
    manufactureNo: "MFG789012",
    statusDetails: "Active",
    lineName: "Server Equipment",
    storeName: "Server Room",
    presentFactory: "Factory B",
    licenseNo: "LIC002",
    licenseDate: "2024-02-01",
    rcvNo: "RCV002",
    invoiceNo: "INV002",
    poNo: "PO002",
    supplier: "HP Enterprise",
    ownerFactory: "Factory B",
    vendorName: "HP Distribution",
    unitPrice: "5000.00",
    currency: "USD",
    physicalLocation: "Server Room, Rack 3",
    ipAddress: "192.168.2.100",
    hostName: "HP-SERVER01",
    operatingSystem: "Windows Server 2022",
    provisionedSpace: "2TB",
    usedSpace: "1TB",
    memorySize: "2TB SSD RAID",
    ramDetails: "64GB ECC",
    cpuModel: "Intel Xeon Gold",
    cpuClock: "2.9GHz",
    ethernetDetails: "10Gbps",
    shipDate: "2024-01-15",
    startDate: "2024-02-01",
    expirationDate: "2029-02-01",
    subnetMask: "255.255.255.0",
    gateway: "192.168.2.1",
    dns: "8.8.4.4",
    platform: "Windows Server",
    remarks: "Production database server",
  },
];

const columns = [
  { key: "equipmentName", label: "Equipment Name" },
  { key: "itemName", label: "Item Name" },
  { key: "itemVariation", label: "Item Variation" },
  { key: "brandName", label: "Brand Name" },
  { key: "modelName", label: "Model Name" },
  { key: "tagId", label: "Tag ID" },
  { key: "manufactureNo", label: "Manufacture No" },
  { key: "statusDetails", label: "Status Details" },
  { key: "lineName", label: "Line Name" },
  { key: "storeName", label: "Store Name" },
  { key: "presentFactory", label: "Present Factory" },
  { key: "licenseNo", label: "License No" },
  { key: "licenseDate", label: "License Date" },
  { key: "rcvNo", label: "RCV No" },
  { key: "invoiceNo", label: "Invoice No" },
  { key: "poNo", label: "PO No" },
  { key: "supplier", label: "Supplier" },
  { key: "ownerFactory", label: "Owner Factory" },
  { key: "vendorName", label: "Vendor Name" },
  { key: "unitPrice", label: "Unit Price" },
  { key: "currency", label: "Currency" },
  { key: "physicalLocation", label: "Physical Location" },
  { key: "ipAddress", label: "IP Address" },
  { key: "hostName", label: "Host Name" },
  { key: "operatingSystem", label: "Operating System" },
  { key: "provisionedSpace", label: "Provisioned Space" },
  { key: "usedSpace", label: "Used Space" },
  { key: "memorySize", label: "Memory Size" },
  { key: "ramDetails", label: "RAM Details" },
  { key: "cpuModel", label: "CPU Model" },
  { key: "cpuClock", label: "CPU Clock" },
  { key: "ethernetDetails", label: "Ethernet Details" },
  { key: "shipDate", label: "Ship Date" },
  { key: "startDate", label: "Start Date" },
  { key: "expirationDate", label: "Expiration Date" },
  { key: "subnetMask", label: "Subnet Mask" },
  { key: "gateway", label: "Gateway" },
  { key: "dns", label: "DNS" },
  { key: "platform", label: "Platform" },
  { key: "remarks", label: "Remarks" },
];

const ViewAsset = () => {
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
              <TableView data={dummyData} columns={columns} onDelete />
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

export default ViewAsset;
