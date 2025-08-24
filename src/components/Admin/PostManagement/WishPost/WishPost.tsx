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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { usePathname, useRouter } from "next/navigation";
import { WishPostModal } from "./WishPostModal";
import { useGetAllPostsQuery } from "@/redux/api/postApi";
import Pagination from "@/components/ui/pagination";
import { Loading } from "@/components/ui/loading";

const WishPost = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("wish");

  const limit = 4; // Increased limit for better pagination

  // Get posts based on current filters
  const { data: allPostsData, isLoading } = useGetAllPostsQuery({
    page: currentPage,
    limit: limit,
    search: searchTerm,
    postType: selectedCategory === "wish" ? "Wish" : "Blog",
  });

  console.log("allposts", allPostsData);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const handleViewClick = (id: string) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const router = useRouter();
  const pathname = usePathname();

  // Set initial category based on route
  useEffect(() => {
    if (pathname.includes("blogPost-Management")) {
      setSelectedCategory("blog");
    } else {
      setSelectedCategory("wish");
    }
  }, [pathname]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Reset to first page when changing category
    if (value === "wish") {
      router.push("/admin/post-Management");
    } else if (value === "blog") {
      router.push("/admin/post-Management/blogPost-Management");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Format date function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).replace(/\//g, '-');
};

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return {
          variant: "secondary" as const,
          className: "bg-[#52C41A33] text-[#52C41A] px-5 py-1 text-base",
        };
      case "pending":
        return {
          variant: "secondary" as const,
          className: "bg-[#FFA50033] text-[#FFA500] px-5 py-1 text-base",
        };
      case "rejected":
        return {
          variant: "destructive" as const,
          className: "bg-[#FF453A33] text-[#FF453A] px-5 py-1 text-base",
        };
      default:
        return {
          variant: "secondary" as const,
          className: "bg-[#52C41A33] text-[#52C41A] px-5 py-1 text-base",
        };
    }
  };







  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-white">
        <div className="flex items-center justify-center space-x-2">
          <Loading></Loading>
        </div>
      </div>
    );
  }




  return (
    <section>
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="w-full space-y-4">
          {/* Header with filters */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedCategory === "wish" ? "Wish Post" : "Blog Post"}
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pr-4 py-2 lg:w-40 bg-white border-gray-200 focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
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
                  <SelectItem
                    value="wish"
                    className="data-[state=checked]:bg-[#08E9DB] hover:bg-[#08E9DB]/20"
                  >
                    Wish Post
                  </SelectItem>
                  <SelectItem
                    value="blog"
                    className="data-[state=checked]:bg-[#08E9DB] hover:bg-[#08E9DB]/20"
                  >
                    Blog Post
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg border bg-white overflow-hidden">
            <Table className="">
              <TableHeader className="bg-[#F8FAFC]">
                <TableRow className="border-b">
                  <TableHead className="text-base font-semibold">
                    Sl No:
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    User Name
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    Product
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    Post Date
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allPostsData?.result?.posts?.length > 0 ? (
                  allPostsData.result.posts.map((post: any, index: number) => {
                    const statusBadge = getStatusBadge(post.status);
                    return (
                      <TableRow
                        key={index}
                        className="border-b last:border-b-0"
                      >
                        <TableCell className="font-medium text-gray-900 py-3">
                          {String(
                            (currentPage - 1) * limit + index + 1
                          ).padStart(2, "0")}
                        </TableCell>
                        <TableCell className="font-medium text-gray-700 py-3 flex justify-start items-center gap-2">
                          <span>
                            <Image
                              src={post.user?.profileImage || userImage}
                              alt="user image"
                              width={40}
                              height={40}
                              className="rounded-sm object-cover w-10 h-10"
                            />
                          </span>
                          {post.user?.userName || "Unknown User"}
                        </TableCell>
                        <TableCell className="text-gray-700 py-3">
                          {post.productName}
                        </TableCell>
                        <TableCell className="py-3">
                          {formatDate(post.createdAt)}
                        </TableCell>
                        <TableCell className="py-3">
                          <Badge
                            variant={statusBadge.variant}
                            className={statusBadge.className}
                          >
                            {post?.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-700 space-x-3">
                          <Button
                            onClick={() =>
                              handleViewClick(post?._id || String(index))
                            }
                            variant="outline"
                            className="bg-blue-50 w-[40%] cursor-pointer text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300 px-4 py-2 rounded-sm font-medium transition-colors"
                          >
                            View
                          </Button>
                          <Button
                            variant="outline"
                            className="bg-red-50 w-[40%] cursor-pointer text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700 hover:border-red-300 px-4 py-2 rounded-sm font-medium transition-colors"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No {selectedCategory === "wish" ? "wish" : "blog"} posts
                      found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <WishPostModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        itemId={selectedId}
      />

      {/* Pagination */}
      {allPostsData?.result?.posts?.length > 0 && (
        <div className="flex justify-end items-center mt-14">
          <Pagination
            totalPage={allPostsData?.result?.meta?.totalPages || 1}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </section>
  );
};

export default WishPost;
