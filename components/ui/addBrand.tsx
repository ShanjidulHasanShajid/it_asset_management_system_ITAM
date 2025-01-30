"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AddBrandProps {
  onBrandAdded: () => void;
}

export default function AddBrand({ onBrandAdded }: AddBrandProps) {
  const [brandName, setBrandName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand_name: brandName }),
      });
      if (response.ok) {
        alert("Brand added successfully!");
        setBrandName("");
        onBrandAdded();
      } else {
        alert("Failed to add brand.");
      }
    } catch (error) {
      console.error("Error adding brand:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add new brand</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-1">
          <div className="space-y-4">
            <Label htmlFor="brand">Brand Name</Label>
            <Input
              id="brand"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter New Brand"
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
