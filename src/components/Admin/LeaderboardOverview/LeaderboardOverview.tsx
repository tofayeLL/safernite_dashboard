/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { Filter, Search } from "lucide-react";

import Image from "next/image";
import userImage from "@/assets/User.png";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useGetAllLeaderBoardOverviewQuery } from "@/redux/api/leaderboardApi";
import { Loading } from "@/components/ui/loading";
import { useDeletePostMutation } from "@/redux/api/postApi";
import Swal from "sweetalert2";
import { toast } from "sonner";

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

const LeaderboardOverview = () => {
  // all leaderboard data
  const { data: LeaderBoardOverviewData, isLoading } = useGetAllLeaderBoardOverviewQuery(
    {}
  );
  console.log("allLeaderBoardOverviewData", LeaderBoardOverviewData);


   const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();




  const [selectedCategory, setSelectedCategory] = useState("all");

   //   handle delete
  const handleDelete = async (id: string) => {


    console.log("delete item id", id);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00A8CC",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        // const loadingToast = toast.loading("Deleting post...");

        const res = await deletePost(id).unwrap();
        console.log("deletePost", res);

        toast.success("Post deleted successfully!");

        Swal.fire("Deleted!", "Your post has been deleted.", "success");

        // Optionally trigger a refetch or update local state
        // refetch();
      } catch (error) {
        console.error("Failed to delete post:", error);
        toast.error("Failed to delete post. Please try again.");

        Swal.fire(
          "Error!",
          "Failed to delete post. Please try again.",
          "error"
        );
      }
    }
  };





  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // Add filtering logic here based on your needs
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
              Leaderboard Overview
            </h2>
            <div className="flex lg:flex-row flex-col items-center gap-4">
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
                  <TableHead className="      text-base font-semibold">
                    Sl No:
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    User Name
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    Product Name
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    End Date
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    Goal Amount
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    Raised Amount
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    Funding Percentage
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LeaderBoardOverviewData?.result?.map(
                  (item: any, index: any) => (
                    <TableRow
                      key={item.id}
                      className="border-b last:border-b-0"
                    >
                      <TableCell className="font-medium text-gray-900 py-3">
                        0{index+1}
                      </TableCell>
                      <TableCell className="font-medium text-gray-700 py-3 flex justify-start items-center gap-2">
                        <span>
                          <Image
                            src={item?.user?.profileImage || userImage}
                            alt="image"
                            width={40}
                            height={40}
                            className="rounded-sm object-cover w-10 h-10"
                          />
                        </span>{" "}
                       {item?.user?.userName || "not found"}
                      </TableCell>
                      <TableCell className="text-gray-700 py-3">
                        {item?.productName}
                      </TableCell>
                      <TableCell className="py-3">{item?.createdAt}</TableCell>
                      <TableCell className="py-3">€{item?.price}</TableCell>
                      <TableCell className="py-3">€{item?.raised}</TableCell>

                      <TableCell className="text-gray-700 py-3">
                        <span className="text-[#52C41A]">100%</span>
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
                         {/* delete button */}
                          <Button
                            onClick={() => handleDelete(item?.id)}
                            disabled={isDeleting}
                            variant="outline"
                             className="bg-[#E353141A] text-[#E35314] hover:text-[#f75510] hover:bg-[#c03e061a] px-5 py-2 text-sm cursor-pointer"
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardOverview;
