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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const [result]: any = await db.execute(
      "DELETE FROM model_t WHERE model_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Model deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting model:", error);
    return NextResponse.json(
      { error: "Error deleting model" },
      { status: 500 }
    );
  }
}
