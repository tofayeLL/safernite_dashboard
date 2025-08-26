/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Search } from "lucide-react";

import Image from "next/image";
import userImage from "@/assets/User.png";
import { Input } from "@/components/ui/input";


import { useGetAllUsersQuery } from "@/redux/api/userApi";
import { Loading } from "../ui/loading";




const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const limit = 1;

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      // Reset to first page when searching
      if (searchTerm !== debouncedSearchTerm) {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, debouncedSearchTerm]);

  const { data: getAllUser, isLoading } = useGetAllUsersQuery({
    page: currentPage,
    limit: limit,
    search: debouncedSearchTerm,
  });

  console.log("userManagement", getAllUser);
  console.log("userManagement2", getAllUser?.result?.users);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
  };

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
          <div className="flex lg:flex-row flex-col items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              User Management
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pr-10 py-2 lg:w-64 bg-white border-gray-200 focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 h-4 w-4 flex items-center justify-center"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg border bg-white overflow-hidden ">
            <Table className="">
              <TableHeader className="bg-[#F8FAFC]">
                <TableRow className="border-b">
                  <TableHead className=" text-base font-semibold">
                    Sl No:
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    User Name
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    ID Number
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    E-mail
                  </TableHead>
                 
                </TableRow>
              </TableHeader>

              <TableBody>
                {getAllUser?.result?.users?.slice(0,6).map((item: any, index: any) => (
                  <TableRow key={item?.id} className="border-b last:border-b-0">
                    <TableCell className="font-medium text-gray-900 py-3">
                      0{index + 1}
                    </TableCell>
                    <TableCell className="font-medium text-gray-700 py-3 flex justify-start items-center gap-2">
                      <span>
                        <Image
                          src={item?.profileImage || userImage}
                          alt="image"
                          width={40}
                          height={40}
                          className="rounded-sm object-cover w-10 h-10"
                        />
                      </span>{" "}
                      {item?.userName}
                    </TableCell>
                    <TableCell className="text-gray-700 py-3">
                      {item?.id}
                    </TableCell>
                    <TableCell className="py-3">{item?.email}</TableCell>
                    
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

export default UserManagement;
