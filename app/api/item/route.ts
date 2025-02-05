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
        i.item_id, 
        e.equipment_name, 
        i.item_name, 
        i.item_variation, 
        b.brand_name, 
        m.model_name, 
        i.manufacture_no, 
        i.status_details, 
        i.line_name, 
        i.store_name, 
        i.present_factory, 
        i.license_no, 
        i.license_date, 
        i.rcv_no, 
        i.invoice_no, 
        i.po_no, 
        i.owner_factory, 
        i.vendor, 
        i.unit_price, 
        i.currency, 
        i.physical_location, 
        i.ip_address, 
        i.host_name, 
        i.operating_system, 
        i.platform, 
        i.provioned_space, 
        i.used_space, 
        i.memory_size, 
        i.ram_details, 
        i.cpu_model, 
        i.cpu_clock, 
        i.ship_date, 
        i.start_date, 
        i.expiration_date, 
        i.remarks
      FROM 
        items_t i
      JOIN 
        equipment_t e ON i.equipment_id = e.equipment_id
      JOIN 
        brands_t b ON i.brand_id = b.brand_id
      JOIN 
        model_t m ON i.model_id = m.model_id;
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
