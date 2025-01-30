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
      SELECT s.sub_category_id, s.sub_category_name, s.category_id, c.category_name
      FROM sub_category_t s
      JOIN category_t c ON s.category_id = c.category_id
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { sub_category_name, category_id } = await req.json();
    await db.execute(
      "INSERT INTO sub_category_t (sub_category_name, category_id) VALUES (?, ?)",
      [sub_category_name, category_id]
    );
    return NextResponse.json({ message: "SubCategory added successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
