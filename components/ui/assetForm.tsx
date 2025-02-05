"use client";
import React, { useEffect, useState } from "react";
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

interface Equipment {
  equipment_id: string;
  equipment_name: string;
}

interface Brand {
  brand_id: string;
  brand_name: string;
}

interface Model {
  model_id: string;
  model_name: string;
}

export default function AssetForm() {
  const [formData, setFormData] = useState({
    equipmentId: "",
    itemName: "",
    itemVariation: "",
    brandId: "",
    modelId: "",
    manufactureNo: "",
    statusDetails: "",
    remarks: "",
    lineName: "",
    storeName: "",
    presentFactory: "",
    ownerFactory: "",
    physicalLocation: "",
    licenseNo: "",
    rcvNo: "",
    invoiceNo: "",
    poNo: "",
    vendor: "",
    unitPrice: "",
    currency: "",
    ipAddress: "",
    subnetMask: "",
    gateway: "",
    dns: "",
    ethernetDetails: "",
    hostName: "",
    operatingSystem: "",
    platform: "",
    provisionedSpace: "",
    usedSpace: "",
    memorySize: "",
    ramDetails: "",
    cpuModel: "",
    cpuClock: "",
    licenseDate: undefined as Date | undefined,
    shipDate: undefined as Date | undefined,
    startDate: undefined as Date | undefined,
    expirationDate: undefined as Date | undefined,
  });

  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [equipmentRes, brandsRes] = await Promise.all([
          fetch("/api/equipment"),
          fetch("/api/brand"),
        ]);

        if (!equipmentRes.ok || !brandsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const equipmentData = await equipmentRes.json();
        const brandsData = await brandsRes.json();

        setEquipment(equipmentData);
        setBrands(brandsData);
      } catch (error) {
        setError("Error loading data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (formData.brandId) {
      const fetchModels = async () => {
        try {
          const response = await fetch(
            `/api/selectedbrandmodel/${formData.brandId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch models");
          }
          const data = await response.json();
          setModels(data);
        } catch (error) {
          console.error("Error fetching models:", error);
          setError("Error loading models");
        }
      };

      fetchModels();
    }
  }, [formData.brandId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange =
    (field: keyof typeof formData) => (date: Date | undefined) => {
      setFormData((prev) => ({
        ...prev,
        [field]: date,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      alert("Asset added successfully");
      // Reset form after successful submission
      setFormData({
        equipmentId: "",
        itemName: "",
        itemVariation: "",
        brandId: "",
        modelId: "",
        manufactureNo: "",
        statusDetails: "",
        remarks: "",
        lineName: "",
        storeName: "",
        presentFactory: "",
        ownerFactory: "",
        physicalLocation: "",
        licenseNo: "",
        rcvNo: "",
        invoiceNo: "",
        poNo: "",
        vendor: "",
        unitPrice: "",
        currency: "",
        ipAddress: "",
        subnetMask: "",
        gateway: "",
        dns: "",
        ethernetDetails: "",
        hostName: "",
        operatingSystem: "",
        platform: "",
        provisionedSpace: "",
        usedSpace: "",
        memorySize: "",
        ramDetails: "",
        cpuModel: "",
        cpuClock: "",
        licenseDate: undefined,
        shipDate: undefined,
        startDate: undefined,
        expirationDate: undefined,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 p-8">
      {/* Identification Details */}
      <Card>
        <CardHeader>
          <CardTitle>Identification Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="equipmentId">Equipment Type*</Label>
            <Select
              value={formData.equipmentId}
              onValueChange={handleSelectChange("equipmentId")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select equipment type" />
              </SelectTrigger>
              <SelectContent>
                {equipment.map((item) => (
                  <SelectItem key={item.equipment_id} value={item.equipment_id}>
                    {item.equipment_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="itemName">Item Name*</Label>
            <Input
              id="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              placeholder="Enter Item Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="itemVariation">Item Variation</Label>
            <Input
              id="itemVariation"
              value={formData.itemVariation}
              onChange={handleInputChange}
              placeholder="Enter Item Variation"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brandId">Brand*</Label>
            <Select
              value={formData.brandId}
              onValueChange={handleSelectChange("brandId")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.brand_id} value={brand.brand_id}>
                    {brand.brand_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="modelId">Model*</Label>
            <Select
              value={formData.modelId}
              onValueChange={handleSelectChange("modelId")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.model_id} value={model.model_id}>
                    {model.model_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="manufactureNo">Manufacture No</Label>
            <Input
              id="manufactureNo"
              value={formData.manufactureNo}
              onChange={handleInputChange}
              placeholder="Enter Manufacture No"
            />
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
            <Select
              value={formData.statusDetails}
              onValueChange={handleSelectChange("statusDetails")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Issued">Issued</SelectItem>
                <SelectItem value="Not Identified">Not Identified</SelectItem>
                <SelectItem value="Backup (Ready to go)">
                  Backup (Ready to go)
                </SelectItem>
                <SelectItem value="Idle (ready to go)">
                  Idle (ready to go)
                </SelectItem>
                <SelectItem value="Disposed (scraped)">
                  Disposed (scraped)
                </SelectItem>
                <SelectItem value="Disposed (not scraped)">
                  Disposed (not scraped)
                </SelectItem>
                <SelectItem value="Under Maintenance">
                  Under Maintenance
                </SelectItem>
                <SelectItem value="In Transition (Location)">
                  In Transition (Location)
                </SelectItem>
                <SelectItem value="Newly Received">Newly Received</SelectItem>
                <SelectItem value="Back to Vendor">Back to Vendor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              placeholder="Enter remarks"
            />
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
            <Input
              id="lineName"
              value={formData.lineName}
              onChange={handleInputChange}
              placeholder="Enter Line Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input
              id="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              placeholder="Enter Store Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="presentFactory">Present Factory</Label>
            <Input
              id="presentFactory"
              value={formData.presentFactory}
              onChange={handleInputChange}
              placeholder="Enter Present Factory"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ownerFactory">Owner Factory</Label>
            <Input
              id="ownerFactory"
              value={formData.ownerFactory}
              onChange={handleInputChange}
              placeholder="Enter Owner Factory"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="physicalLocation">Physical Location</Label>
            <Textarea
              id="physicalLocation"
              value={formData.physicalLocation}
              onChange={handleInputChange}
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
            <Input
              id="licenseNo"
              value={formData.licenseNo}
              onChange={handleInputChange}
              placeholder="Enter License No"
            />
          </div>
          <div className="space-y-2">
            <Label>License Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.licenseDate
                    ? format(formData.licenseDate, "PPP")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.licenseDate}
                  onSelect={handleDateChange("licenseDate")}
                  initialFocus
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
            <Input
              id="rcvNo"
              value={formData.rcvNo}
              onChange={handleInputChange}
              placeholder="Enter RCV No"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invoiceNo">Invoice No</Label>
            <Input
              id="invoiceNo"
              value={formData.invoiceNo}
              onChange={handleInputChange}
              placeholder="Enter Invoice No"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="poNo">PO No</Label>
            <Input
              id="poNo"
              value={formData.poNo}
              onChange={handleInputChange}
              placeholder="Enter PO No"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supplierVendor">Vendor Name</Label>
            <Input
              id="supplierVendor"
              value={formData.vendor}
              onChange={handleInputChange}
              placeholder="Enter Vendor Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unitPrice">Unit Price</Label>
            <Input
              id="unitPrice"
              value={formData.unitPrice}
              type="number"
              onChange={handleInputChange}
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
                  {formData.shipDate
                    ? format(formData.shipDate, "PPP")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.shipDate}
                  onSelect={handleDateChange("shipDate")}
                  initialFocus
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
            <Input
              id="ipAddress"
              value={formData.ipAddress}
              onChange={handleInputChange}
              placeholder="Enter IP Address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subnetMask">Subnet Mask</Label>
            <Input
              id="subnetMask"
              value={formData.subnetMask}
              onChange={handleInputChange}
              placeholder="Enter Subnet Mask"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gateway">Gateway</Label>
            <Input
              id="gateway"
              value={formData.gateway}
              onChange={handleInputChange}
              placeholder="Enter Gateway"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dns">DNS</Label>
            <Input
              id="dns"
              value={formData.dns}
              onChange={handleInputChange}
              placeholder="Enter DNS"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="ethernetDetails">Ethernet Details</Label>
            <Textarea
              id="ethernetDetails"
              value={formData.ethernetDetails}
              onChange={handleInputChange}
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
            <Input
              id="hostName"
              value={formData.hostName}
              onChange={handleInputChange}
              placeholder="Enter Host Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="operatingSystem">Operating System</Label>
            <Input
              id="operatingSystem"
              value={formData.operatingSystem}
              onChange={handleInputChange}
              placeholder="Enter Operating System"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Input
              id="platform"
              value={formData.platform}
              onChange={handleInputChange}
              placeholder="Enter Platform"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="provisionedSpace">Provisioned Space</Label>
            <Input
              id="provisionedSpace"
              value={formData.provisionedSpace}
              onChange={handleInputChange}
              placeholder="Enter Provisioned Space"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="usedSpace">Used Space</Label>
            <Input
              id="usedSpace"
              value={formData.usedSpace}
              onChange={handleInputChange}
              placeholder="Enter Used Space"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="memorySize">Memory Size</Label>
            <Input
              id="memorySize"
              value={formData.memorySize}
              onChange={handleInputChange}
              placeholder="Enter Memory Size"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ramDetails">RAM Details</Label>
            <Input
              id="ramDetails"
              value={formData.ramDetails}
              onChange={handleInputChange}
              placeholder="Enter RAM Details"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpuModel">CPU Model</Label>
            <Input
              id="cpuModel"
              value={formData.cpuModel}
              onChange={handleInputChange}
              placeholder="Enter CPU Model"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpuClock">CPU Clock</Label>
            <Input
              id="cpuClock"
              value={formData.cpuClock}
              onChange={handleInputChange}
              placeholder="Enter CPU Clock"
            />
          </div>
        </CardContent>
      </Card>

      {/* Dates and Timeframes */}
      <Card>
        <CardHeader>
          <CardTitle>Dates and Time-frames</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.startDate
                    ? format(formData.startDate, "PPP")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.startDate}
                  onSelect={handleDateChange("startDate")}
                  initialFocus
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
                  {formData.expirationDate
                    ? format(formData.expirationDate, "PPP")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.expirationDate}
                  onSelect={handleDateChange("expirationDate")}
                  initialFocus
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
