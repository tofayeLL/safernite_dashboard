/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import userImage from "@/assets/User.png";
import { Badge } from "@/components/ui/badge";
import { useGetAllShipmentsQuery } from "@/redux/api/shipmentApi";
import { Loading } from "@/components/ui/loading";



/* interface ActivityData {
  id: string;
  date: string;
  user: string;
  details: string;
  status: {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    color: string;
  };
} */

const ShippingManagement = () => {
  const { data: allShipments, isLoading } = useGetAllShipmentsQuery({});

  console.log("all shipments", allShipments);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-white">
        <div className="flex items-center justify-center space-x-2">
          <Loading ></Loading>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="w-full space-y-4">
          {/* Header with filters */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Shipping Management
            </h2>
          </div>

          {/* Table */}
          <div className="rounded-lg border bg-white overflow-hidden ">
            <Table className="">
              <TableHeader className="bg-[#F8FAFC]">
                <TableRow className="border-b">
                  <TableHead className=" text-base font-semibold">
                    Full name
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    Email Address
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    Phone number
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    Country
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    Address
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    City
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    State
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allShipments?.result?.map((item: any) => (
                  <TableRow key={item.id} className="border-b last:border-b-0">
                    <TableCell className="font-medium text-gray-700 py-3 flex justify-start items-center gap-2">
                      <span>
                        <Image
                          src={userImage}
                          alt="image"
                          width={40}
                          height={40}
                          className="rounded-sm object-cover w-10 h-10"
                        />
                      </span>{" "}
                      {item?.fullName}
                    </TableCell>
                    <TableCell>{item?.email}</TableCell>
                    <TableCell className="py-3">{item?.phone}</TableCell>
                    <TableCell className="py-3">{item?.country}</TableCell>
                    <TableCell className="py-3">{item?.address}</TableCell>
                    <TableCell className="py-3">{item?.city}</TableCell>
                    <TableCell className="py-3">{item?.state} </TableCell>
                    <TableCell className="py-3">
                      <Badge
                        variant="secondary"
                        className={`px-5 py-1 text-base ${
                          item?.status === "Pending"
                            ? "bg-[#FFF7E8] text-[#FAAD14]"
                            : item?.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : item?.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700" // fallback
                        }`}
                      >
                        {item?.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingManagement;
