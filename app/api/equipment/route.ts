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
      SELECT 
        e.equipment_id,
        e.equipment_name,
        s.sub_category_name,
        t.team_name
      FROM equipment_t e
      JOIN sub_category_t s ON e.sub_category_id = s.sub_category_id
      JOIN teams_t t ON e.team_id = t.team_id
      ORDER BY e.equipment_id
    `);
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
