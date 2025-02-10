"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddEquipmentProps {
  onEquipmentAdded: () => void;
  subcategories: Array<{ sub_category_id: string; sub_category_name: string }>;
  teams: Array<{ team_id: string; team_name: string }>;
}

export default function AddEquipment({
  onEquipmentAdded,
  subcategories,
  teams,
}: AddEquipmentProps) {
  const [equipmentName, setEquipmentName] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/equipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equipment_name: equipmentName,
          sub_category_id: selectedSubCategory,
          team_id: selectedTeam,
        }),
      });

      if (response.ok) {
        alert("Equipment added successfully!");
        setEquipmentName("");
        setSelectedSubCategory("");
        setSelectedTeam("");
        onEquipmentAdded();
      } else {
        alert("Failed to add equipment.");
      }
    } catch (error) {
      console.error("Error adding equipment:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add new Equipment</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="subcategory">Sub Category name</Label>
            <Select
              onValueChange={setSelectedSubCategory}
              value={selectedSubCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sub category" />
              </SelectTrigger>
              <SelectContent>
                {subcategories.map((subcat) => (
                  <SelectItem
                    key={subcat.sub_category_id}
                    value={subcat.sub_category_id}
                  >
                    {subcat.sub_category_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="equipment">Equipment name</Label>
            <Input
              id="equipment"
              value={equipmentName}
              onChange={(e) => setEquipmentName(e.target.value)}
              placeholder="Enter equipment name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team">Team</Label>
            <Select onValueChange={setSelectedTeam} value={selectedTeam}>
              <SelectTrigger>
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.team_id} value={team.team_id}>
                    {team.team_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-2 flex justify-end space-x-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
