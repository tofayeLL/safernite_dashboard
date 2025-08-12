"use client";
import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Filter, Search, Trash2 } from "lucide-react";

import Image from "next/image";
import userImage from "@/assets/User.png";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

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

const Notification = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // Add filtering logic here based on your needs
  };

  return (
    <section>
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="w-full space-y-4">
          {/* Header with filters */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Leaderboard Overview
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search"
                  className=" pr-4 py-2 lg:w-40 bg-white border-gray-200 focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="">
                  <Filter className="h-4 w-4" />
                  Filter
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Category</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="cases">Cases</SelectItem>
                  <SelectItem value="reports">Reports</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg border bg-white overflow-hidden ">
            <Table className="">
              <TableHeader className="bg-[#F8FAFC]">
                <TableRow className="border-b">
                  <TableHead className=" text-base font-semibold">
                    User Name
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    Message
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    Date
                  </TableHead>

                  <TableHead className=" text-base font-semibold">
                    Action
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
                  <TableCell className="text-gray-700 py-3">
                    Jorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </TableCell>

                  <TableCell className="text-gray-700 py-3">
                    2025-09-28
                  </TableCell>
                  {/*  <Badge
                        variant="secondary"
                        className={`px-5 py-1 text-base ${
                          status === "Active"
                            ? "bg-[#EEF9E8] text-[#53C31B]"
                            : "bg-[#FE4D4F] text-[#53C31B]"
                        }`}
                      >
                        {status}
                      </Badge> */}
                  <TableCell className="text-gray-700 py-3">
                    <Trash2 className="text-[#FF4D4F] cursor-pointer" />
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

export default Notification;
