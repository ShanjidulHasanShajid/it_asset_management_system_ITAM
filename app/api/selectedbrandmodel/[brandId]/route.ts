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

export async function GET(
  request: Request,
  { params }: { params: { brandId: string } }
) {
  const brandId = params.brandId;

  try {
    const [rows] = await db.execute(
      "SELECT model_id, model_name FROM model_t WHERE brand_id = ?",
      [brandId]
    );

    // Check if rows is an array
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json(rows);
    } else {
      return NextResponse.json(
        { error: "No models found for this brand" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
