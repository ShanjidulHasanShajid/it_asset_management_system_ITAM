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

export async function POST(req: Request) {
  try {
    const { uid, password } = await req.json();

    // Query the database to verify user credentials
    const [rows]: any = await db.execute(
      "SELECT * FROM user_t WHERE user_id = ? AND password = ?",
      [uid, password]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Return user details with role for routing
    const user = rows[0];

    return NextResponse.json({
      userId: user.user_id,
      userName: user.user_name,
      dept: user.dept,
      teamId: user.team_id,
      role:
        user.dept === "Super Admin"
          ? "Super Admin"
          : user.dept === "Admin"
          ? "Admin"
          : "IT Member",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
