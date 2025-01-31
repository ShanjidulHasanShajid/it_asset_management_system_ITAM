import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT u.user_id, u.user_name, u.password, u.team_id, u.dept, t.team_name
      FROM user_t u
      JOIN teams_t t ON u.team_id = t.team_id
    `);
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
