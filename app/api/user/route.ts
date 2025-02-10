import { NextResponse, NextRequest } from "next/server";
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
    // Get department from cookies
    const dept = req.cookies.get("dept")?.value;
    const teamId = req.cookies.get("teamId")?.value;

    let query = `
      SELECT u.user_id, u.user_name, u.password, u.team_id, u.dept, t.team_name
      FROM user_t u
      JOIN teams_t t ON u.team_id = t.team_id
    `;

    // Apply filters based on user department
    if (dept === "Admin") {
      query += ` WHERE u.dept != 'Super Admin'`;
    } else if (dept !== "Super Admin") {
      query += ` WHERE u.team_id = ?`;
    }

    // Execute query with parameters if needed
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
    const { user_name, password, team_id, dept } = await req.json();
    await db.execute(
      "INSERT INTO user_t (user_name, password, team_id, dept) VALUES (?, ?, ?, ?)",
      [user_name, password, team_id, dept]
    );
    return NextResponse.json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
