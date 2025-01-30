"use client";
import React, { useState, useEffect } from "react";
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

interface Brand {
  brand_id: string;
  brand_name: string;
}

interface AddModelProps {
  onModelAdded: () => void;
  brands: Brand[];
}

export default function AddModel({ onModelAdded, brands }: AddModelProps) {
  const [modelName, setModelName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/brandmodel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_name: modelName,
          brand_id: brandId,
        }),
      });

      if (response.ok) {
        alert("Model added successfully!");
        setModelName("");
        setBrandId("");
        onModelAdded();
      } else {
        alert("Failed to add model.");
      }
    } catch (error) {
      console.error("Error adding model:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add new model</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Brand Name</Label>
            <Select onValueChange={(value) => setBrandId(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.brand_id} value={brand.brand_id}>
                    {brand.brand_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="itemVariation">Model name</Label>
            <Input
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder="Model Name"
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
