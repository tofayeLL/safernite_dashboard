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
                <TableRow className="border-b last:border-b-0">
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
                    Mia Johnson
                  </TableCell>
                  <TableCell>shamim03@gmail.com</TableCell>
                  <TableCell className="py-3">+123 456 7899</TableCell>
                  <TableCell className="py-3">USA</TableCell>
                  <TableCell className="py-3">1245 Maple Street</TableCell>
                  <TableCell className="py-3">Denver</TableCell>
                  <TableCell className="py-3">Colorado </TableCell>
                  <TableCell className="py-3">
                    <Badge
                      variant="secondary"
                      className="bg-[#FFF7E8] text-[#FAAD14] px-5 py-1 text-base"
                    >
                      Pending
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingManagement;
