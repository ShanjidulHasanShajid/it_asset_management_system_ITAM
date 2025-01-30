"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AddCategoryProps {
  onCategoryAdded: () => void;
  categories: Array<{ category_id: string; category_name: string }>;
}

export default function AddCategory({
  onCategoryAdded,
  categories,
}: AddCategoryProps) {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_name: categoryName }),
      });
      if (response.ok) {
        alert("Category added successfully!");
        setCategoryName("");
        onCategoryAdded(); // This will trigger the fetch in parent component
      } else {
        alert("Failed to add category.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add new category</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-1">
          <div className="space-y-4">
            <Label htmlFor="category">Category Name</Label>
            <Input
              id="category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter New Category"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
