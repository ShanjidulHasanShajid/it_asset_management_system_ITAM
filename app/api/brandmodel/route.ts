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
      SELECT m.model_id, m.model_name, m.brand_id, b.brand_name
      FROM model_t m
      JOIN brands_t b ON m.brand_id = b.brand_id
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { model_name, brand_id } = await req.json();
    await db.execute(
      "INSERT INTO model_t (model_name, brand_id) VALUES (?, ?)",
      [model_name, brand_id]
    );
    return NextResponse.json({ message: "Model added successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
