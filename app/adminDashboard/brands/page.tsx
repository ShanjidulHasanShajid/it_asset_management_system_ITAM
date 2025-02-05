"use client";

import React, { useState, useEffect } from "react";
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
import Link from "next/link";
import AddBrand from "@/components/ui/addBrand";
import AddModel from "@/components/ui/addModel";
import TableView from "@/components/ui/tableView";

const Brands = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  const router = useRouter();
  useEffect(() => {
    const dept = sessionStorage.getItem("dept");
    console.log(sessionStorage);

    if (!dept || dept !== "Admin") {
      router.push("/"); // Redirect to login page if the user is not a super admin
    }
  });

  // Fetch brands
  const fetchBrands = async () => {
    try {
      const response = await fetch("/api/brand");
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  // Fetch models
  const fetchModels = async () => {
    try {
      const response = await fetch("/api/brandmodel");
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  // Delete brand
  const handleDeleteBrand = async (brand: any) => {
    try {
      const response = await fetch(`/api/brand/${brand.brand_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchBrands(); // Refresh brands list
        fetchModels(); // Refresh models list since they depend on brands
      } else {
        console.error("Failed to delete brand.");
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  // Delete model
  const handleDeleteModel = async (model: any) => {
    try {
      const response = await fetch(`/api/brandmodel/${model.model_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchModels(); // Refresh models list
      } else {
        console.error("Failed to delete model.");
      }
    } catch (error) {
      console.error("Error deleting model:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
    fetchModels();
  }, []);

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
  const userProfile = {
    name: "John Doe",
    uid: "AD123456",
  };

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
            Admin Dashboard
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
            Brand and Model Management
          </h2>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Form Cards */}
          <div className="grid gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-slate-800 mb-6">
                  Add New Items
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <AddBrand onBrandAdded={fetchBrands} />
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <AddModel onModelAdded={fetchModels} brands={brands} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tables Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Brands Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-slate-800 mb-4">
                  Brands
                </h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden h-96 overflow-y-auto">
                  <TableView
                    data={brands}
                    columns={[
                      { key: "brand_id", label: "Brand ID" },
                      { key: "brand_name", label: "Brand Name" },
                    ]}
                    onDelete={handleDeleteBrand}
                    tableName="Brand"
                  />
                </div>
              </div>
            </div>

            {/* Models Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-slate-800 mb-4">
                  Models
                </h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden h-96 overflow-y-auto">
                  <TableView
                    data={models}
                    columns={[
                      { key: "model_id", label: "Model ID" },
                      { key: "model_name", label: "Model Name" },
                      { key: "brand_name", label: "Brand Name" },
                    ]}
                    onDelete={handleDeleteModel}
                    tableName="Model"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
