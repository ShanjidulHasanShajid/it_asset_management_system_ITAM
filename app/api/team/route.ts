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
    const [rows] = await db.execute("SELECT * FROM teams_t ORDER BY team_id");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { team_name } = await req.json();
    await db.execute("INSERT INTO teams_t (team_name) VALUES (?)", [team_name]);
    return NextResponse.json({ message: "Team added successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
