"use client";

import React, { useState, useEffect } from "react";
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
import AddCategory from "@/components/ui/addCategory";
import AddSubCategory from "@/components/ui/addSubCategory";
import AddEquipment from "@/components/ui/addEquipment";
import TableView from "@/components/ui/tableView";
import AddTeam from "@/components/ui/addTeam";

interface Category {
  category_id: string;
  category_name: string;
}

interface Subcategory {
  sub_category_id: string;
  sub_category_name: string;
  category_id: string;
  category_name: string;
}

interface Equipment {
  equipment_id: string;
  equipment_name: string;
  sub_category_name: string;
  team_name: string;
}

interface Team {
  team_id: string;
  team_name: string;
}

const AssetAdministration = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  // Fetch functions
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetch("/api/subcategory");
      const data = await response.json();
      setSubcategories(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const fetchEquipments = async () => {
    try {
      const response = await fetch("/api/equipment");
      const data = await response.json();
      setEquipments(data);
    } catch (error) {
      console.error("Error fetching equipments:", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/team");
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchEquipments();
    fetchTeams();
  }, []);

  // Delete handlers
  const handleDeleteCategory = async (category: Category) => {
    try {
      const response = await fetch(`/api/category/${category.category_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete category");
      }

      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category. Please try again.");
    }
  };

  const handleDeleteSubCategory = async (subCategory: Subcategory) => {
    try {
      const response = await fetch(
        `/api/subcategory/${subCategory.sub_category_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete subcategory");
      }

      fetchSubcategories();
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      alert("Failed to delete subcategory. Please try again.");
    }
  };

  const handleDeleteEquipment = async (equipment: Equipment) => {
    try {
      const response = await fetch(`/api/equipment/${equipment.equipment_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete equipment");
      }

      fetchEquipments();
    } catch (error) {
      console.error("Error deleting equipment:", error);
      alert("Failed to delete equipment. Please try again.");
    }
  };

  const handleDeleteTeam = async (team: Team) => {
    try {
      const response = await fetch(`/api/team/${team.team_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete team");
      }

      fetchTeams();
    } catch (error) {
      console.error("Error deleting team:", error);
      alert("Failed to delete team. Please try again.");
    }
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
            Asset Administration
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
                    <AddCategory
                      onCategoryAdded={fetchCategories}
                      categories={categories}
                    />
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <AddSubCategory
                      onSubCategoryAdded={fetchSubcategories}
                      categories={categories}
                    />
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <AddEquipment
                      onEquipmentAdded={fetchEquipments}
                      subcategories={subcategories}
                      teams={teams}
                    />
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <AddTeam onTeamAdded={fetchTeams} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tables Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Category Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-slate-800 mb-4">
                  Categories
                </h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden h-96 overflow-y-auto">
                  <TableView
                    data={categories}
                    columns={[
                      { key: "category_id", label: "Category ID" },
                      { key: "category_name", label: "Category Name" },
                    ]}
                    onDelete={handleDeleteCategory}
                    tableName="category"
                  />
                </div>
              </div>
            </div>

            {/* Sub Category Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-slate-800 mb-4">
                  Sub Categories
                </h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden h-96 overflow-y-auto">
                  <TableView
                    data={subcategories}
                    columns={[
                      { key: "sub_category_id", label: "Sub Category ID" },
                      { key: "sub_category_name", label: "Sub Category Name" },
                      { key: "category_name", label: "Category" },
                    ]}
                    onDelete={handleDeleteSubCategory}
                    tableName="subcategory"
                  />
                </div>
              </div>
            </div>

            {/* Equipment Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-slate-800 mb-4">
                  Equipment
                </h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden h-96 overflow-y-auto">
                  <TableView
                    data={equipments}
                    columns={[
                      { key: "equipment_id", label: "Equipment ID" },
                      { key: "equipment_name", label: "Equipment Name" },
                      { key: "sub_category_name", label: "Sub Category" },
                      { key: "team_name", label: "Team" },
                    ]}
                    onDelete={handleDeleteEquipment}
                    tableName="equipment"
                  />
                </div>
              </div>
            </div>

            {/* Team Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-slate-800 mb-4">
                  Teams
                </h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden h-96 overflow-y-auto">
                  <TableView
                    data={teams}
                    columns={[
                      { key: "team_id", label: "Team ID" },
                      { key: "team_name", label: "Team Name" },
                    ]}
                    onDelete={handleDeleteTeam}
                    tableName="team"
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

export default AssetAdministration;
