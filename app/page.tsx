"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    uid: "",
    team: "",
    password: "",
  });
  const router = useRouter(); // Used for navigation after login

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Sending credentials to the API
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();

      // Save user info in session
      sessionStorage.setItem("userId", data.userId);
      sessionStorage.setItem("userName", data.userName);
      sessionStorage.setItem("dept", data.dept);
      sessionStorage.setItem("teamId", data.teamId);

      // Redirect based on the role of the user
      if (data.role === "Super Admin") {
        router.push("/superAdminDashboard");
      } else if (data.role === "Admin") {
        router.push("/adminDashboard");
      } else if (data.role === "IT Member") {
        router.push("/itMemberDashboard");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  const teams = [
    { id: "Admin", name: "Admin" },
    { id: "Super Admin", name: "Super Admin" },
    { id: "IT User", name: "IT User" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="uid">User ID</Label>
              <Input
                id="uid"
                placeholder="Enter your UID"
                value={formData.uid}
                onChange={(e) =>
                  setFormData({ ...formData, uid: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="team">User Type</Label>
              <Select
                value={formData.team}
                onValueChange={(value) =>
                  setFormData({ ...formData, team: value })
                }
              >
                <SelectTrigger id="team">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
