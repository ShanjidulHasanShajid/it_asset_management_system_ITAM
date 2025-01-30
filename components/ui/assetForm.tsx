"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

export default function EquipmentForm() {
  const equipmentList = [
    { value: "printer", label: "Printer" },
    { value: "switch", label: "Switch" },
    { value: "router", label: "Router" },
  ];

  const [startDate, setStartDate] = React.useState<Date>();
  const [expirationDate, setExpirationDate] = React.useState<Date>();
  const [licenseDate, setLicenseDate] = React.useState<Date>();
  const [shipDate, setShipDate] = React.useState<Date>();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return format(date, "PPP");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 p-8">
      {/* Identification Details */}
      <Card>
        <CardHeader>
          <CardTitle>Identification Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="statusDetails">Equipment Type*</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select equipment type" />
              </SelectTrigger>
              <SelectContent>
                {equipmentList.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="statusDetails">Item Name*</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select item name" />
              </SelectTrigger>
              <SelectContent>
                {equipmentList.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="itemVariation">Item Variation</Label>
            <Input id="itemVariation" placeholder="Enter Item Variation" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="statusDetails">Brand*</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select brand name" />
              </SelectTrigger>
              <SelectContent>
                {equipmentList.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="statusDetails">Model*</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select equipment model" />
              </SelectTrigger>
              <SelectContent>
                {equipmentList.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagId">Tag ID*</Label>
            <Input id="tagId" placeholder="Enter Tag ID" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manufactureNo">Manufacture No</Label>
            <Input id="manufactureNo" placeholder="Enter Manufacture No" />
          </div>
        </CardContent>
      </Card>

      {/* Status and Operational Details */}
      <Card>
        <CardHeader>
          <CardTitle>Status and Operational Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="statusDetails">Status Details</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Issued</SelectItem>
                <SelectItem value="inactive">Not Identified</SelectItem>
                <SelectItem value="maintenance">
                  Backup (Ready to go)
                </SelectItem>
                <SelectItem value="maintenance">Idle (ready to go)</SelectItem>
                <SelectItem value="maintenance">Disposed (scraped)</SelectItem>
                <SelectItem value="maintenance">
                  Disposed (not scraped)
                </SelectItem>
                <SelectItem value="maintenance">Under Maintenance</SelectItem>
                <SelectItem value="maintenance">
                  In Transition (Location)
                </SelectItem>
                <SelectItem value="maintenance">Newly Recieved</SelectItem>
                <SelectItem value="maintenance">Back to Vendor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="remark">Remarks</Label>
            <Textarea id="remark" placeholder="Enter remarks" />
          </div>
        </CardContent>
      </Card>

      {/* Location and Ownership */}
      <Card>
        <CardHeader>
          <CardTitle>Location and Ownership</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="lineName">Line Name</Label>
            <Input id="lineName" placeholder="Enter Line Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input id="storeName" placeholder="Enter Store Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="presentFactory">Present Factory</Label>
            <Input id="presentFactory" placeholder="Enter Present Factory" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ownerFactory">Owner Factory</Label>
            <Input id="ownerFactory" placeholder="Enter Owner Factory" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="physicalLocation">Physical Location</Label>
            <Textarea
              id="physicalLocation"
              placeholder="Enter Physical Location"
            />
          </div>
        </CardContent>
      </Card>

      {/* Licensing and Legal Details */}
      <Card>
        <CardHeader>
          <CardTitle>Licensing and Legal Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="licenseNo">License No</Label>
            <Input id="licenseNo" placeholder="Enter License No" />
          </div>
          <div className="space-y-2">
            <Label>License Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {licenseDate ? format(licenseDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={licenseDate}
                  onSelect={setLicenseDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Procurement and Supplier Details */}
      <Card>
        <CardHeader>
          <CardTitle>Procurement and Supplier Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="rcvNo">RCV No</Label>
            <Input id="rcvNo" placeholder="Enter RCV No" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invoiceNo">Invoice No</Label>
            <Input id="invoiceNo" placeholder="Enter Invoice No" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="poNo">PO No</Label>
            <Input id="poNo" placeholder="Enter PO No" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supplierVendor">Supplier/Vendor Name</Label>
            <Input
              id="supplierVendor"
              placeholder="Enter Supplier/Vendor Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unitPrice">Unit Price</Label>
            <Input
              id="unitPrice"
              type="number"
              placeholder="Enter Unit Price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">BDT</SelectItem>
                <SelectItem value="eur">INR</SelectItem>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Ship Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {shipDate ? format(shipDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={shipDate}
                  onSelect={setShipDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Network Details */}
      <Card>
        <CardHeader>
          <CardTitle>Network Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="ipAddress">IP Address</Label>
            <Input id="ipAddress" placeholder="Enter IP Address" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subnetMask">Subnet Mask</Label>
            <Input id="subnetMask" placeholder="Enter Subnet Mask" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gateway">Gateway</Label>
            <Input id="gateway" placeholder="Enter Gateway" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dns">DNS</Label>
            <Input id="dns" placeholder="Enter DNS" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="ethernetDetails">Ethernet Details</Label>
            <Textarea
              id="ethernetDetails"
              placeholder="Enter Ethernet Details"
            />
          </div>
        </CardContent>
      </Card>

      {/* System and Hardware Details */}
      <Card>
        <CardHeader>
          <CardTitle>System and Hardware Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="hostName">Host Name</Label>
            <Input id="hostName" placeholder="Enter Host Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="operatingSystem">Operating System</Label>
            <Input id="operatingSystem" placeholder="Enter Operating System" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Input id="platform" placeholder="Enter Platform" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="provisionedSpace">Provisioned Space</Label>
            <Input
              id="provisionedSpace"
              placeholder="Enter Provisioned Space"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="usedSpace">Used Space</Label>
            <Input id="usedSpace" placeholder="Enter Used Space" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="memorySize">Memory Size</Label>
            <Input id="memorySize" placeholder="Enter Memory Size" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ramDetails">RAM Details</Label>
            <Input id="ramDetails" placeholder="Enter RAM Details" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpuModel">CPU Model</Label>
            <Input id="cpuModel" placeholder="Enter CPU Model" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpuClock">CPU Clock</Label>
            <Input id="cpuClock" placeholder="Enter CPU Clock" />
          </div>
        </CardContent>
      </Card>

      {/* Dates and Timeframes */}
      <Card>
        <CardHeader>
          <CardTitle>Dates and Timeframes</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>Expiration Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expirationDate
                    ? format(expirationDate, "PPP")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={expirationDate}
                  onSelect={setExpirationDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

// export default EquipmentForm;
