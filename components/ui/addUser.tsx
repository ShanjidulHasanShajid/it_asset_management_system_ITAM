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

interface Team {
  team_id: string;
  team_name: string;
}

interface AddUserProps {
  onUserAdded: () => void;
  teams: Team[];
}

export default function AddUser({ onUserAdded, teams }: AddUserProps) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [teamId, setTeamId] = useState("");
  const [dept, setDept] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: userName,
          password,
          team_id: teamId,
          dept,
        }),
      });

      if (response.ok) {
        alert("User added successfully!");
        setUserName("");
        setPassword("");
        setTeamId("");
        setDept("");
        onUserAdded();
      } else {
        alert("Failed to add user.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add new user</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="userName">User name</Label>
            <Input
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter user name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dept">Department</Label>
            <Input
              id="dept"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              placeholder="Enter department"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team">Select Team</Label>
            <Select onValueChange={(value) => setTeamId(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Team" />
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
