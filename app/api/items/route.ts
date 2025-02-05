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
    const formData = await req.json();

    // Format dates for MySQL
    const formatDate = (date: string | null) =>
      date ? new Date(date).toISOString().split("T")[0] : null;

    const query = `
      INSERT INTO items_t (
        item_name, equipment_id, item_variation, brand_id, model_id,
        manufacture_no, status_details, remarks, line_name, store_name,
        present_factory, owner_factory, physical_location, license_no,
        license_date, rcv_no, invoice_no, po_no, vendor, unit_price,
        currency, ship_date, ip_address, subnet_musk, gateway, DNS,
        ethernet_details, host_name, operating_system, platform,
        provioned_space, used_space, memory_size, ram_details,
        cpu_model, cpu_clock, start_date, expiration_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      formData.itemName,
      formData.equipmentId,
      formData.itemVariation,
      formData.brandId,
      formData.modelId,
      formData.manufactureNo,
      formData.statusDetails,
      formData.remarks,
      formData.lineName,
      formData.storeName,
      formData.presentFactory,
      formData.ownerFactory,
      formData.physicalLocation,
      formData.licenseNo,
      formatDate(formData.licenseDate),
      formData.rcvNo,
      formData.invoiceNo,
      formData.poNo,
      formData.vendor,
      formData.unitPrice,
      formData.currency,
      formatDate(formData.shipDate),
      formData.ipAddress,
      formData.subnetMask,
      formData.gateway,
      formData.dns,
      formData.ethernetDetails,
      formData.hostName,
      formData.operatingSystem,
      formData.platform,
      formData.provisionedSpace,
      formData.usedSpace,
      formData.memorySize,
      formData.ramDetails,
      formData.cpuModel,
      formData.cpuClock,
      formatDate(formData.startDate),
      formatDate(formData.expirationDate),
    ];

    await db.execute(query, values);

    return NextResponse.json({ message: "Asset added successfully" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
