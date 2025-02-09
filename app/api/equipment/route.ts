import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export async function GET(req: NextRequest) {
  try {
    // Get values from cookies
    const dept = req.cookies.get("dept")?.value;
    const teamId = req.cookies.get("teamId")?.value;

    // Base query
    let query = `
      SELECT 
        e.equipment_id,
        e.equipment_name,
        s.sub_category_name,
        t.team_name
      FROM equipment_t e
      JOIN sub_category_t s ON e.sub_category_id = s.sub_category_id
      JOIN teams_t t ON e.team_id = t.team_id
    `;

    // Add WHERE clause if user is not Admin or Super Admin
    if (dept !== "Super Admin" && dept !== "Admin") {
      query += ` WHERE e.team_id = ?`;
    }

    query += ` ORDER BY e.equipment_id`;

    // Execute query with or without parameter based on dept
    const [rows] = await db.execute(
      query,
      dept !== "Super Admin" && dept !== "Admin" ? [teamId] : []
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { equipment_name, sub_category_id, team_id } = await req.json();
    await db.execute(
      "INSERT INTO equipment_t (equipment_name, sub_category_id, team_id) VALUES (?, ?, ?)",
      [equipment_name, sub_category_id, team_id]
    );
    return NextResponse.json({ message: "Equipment added successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
