"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  category_id: string;
  category_name: string;
}

interface AddSubCategoryProps {
  onSubCategoryAdded: () => void;
  categories: Category[];
}

export default function AddSubCategory({
  onSubCategoryAdded,
  categories,
}: AddSubCategoryProps) {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/subcategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sub_category_name: subCategoryName,
          category_id: categoryId,
        }),
      });
      if (response.ok) {
        alert("Sub-category added successfully!");
        setSubCategoryName("");
        setCategoryId("");
        onSubCategoryAdded();
      } else {
        alert("Failed to add sub-category.");
      }
    } catch (error) {
      console.error("Error adding sub-category:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add new sub-category</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Main category name</Label>
            <Select onValueChange={(value) => setCategoryId(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category name" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subCategory">Sub-category name</Label>
            <Input
              id="subCategory"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              placeholder="Enter sub-category name"
              required
            />
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
