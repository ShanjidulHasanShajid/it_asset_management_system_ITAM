"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
const equipmentList = [
  { value: "printer", label: "Printer" },
  { value: "switch", label: "Switch" },
  { value: "router", label: "Router" },
];

const handleSubmit = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  // Handle form submission
};

export default function AddModel() {
  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add new model</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="statusDetails">Brand name</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Brand name" />
              </SelectTrigger>
              <SelectContent>
                {equipmentList.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="itemVariation">Model name</Label>
            <Input id="itemVariation" placeholder="Enter sub-category name" />
          </div>
          <div></div>
          <AlertDialog>
            <AlertDialogTrigger>
              <div className="flex justify-end space-x-4">
                <Button type="submit">Submit</Button>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Adding new Sub-Category</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will add another sub category to the database. Are
                  you sure about this?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Yes</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </form>
  );
}
