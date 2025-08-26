/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { usePathname, useRouter } from "next/navigation";

import { useGetAllPostsQuery } from "@/redux/api/postApi";

import { Loading } from "@/components/ui/loading";
import Pagination from "@/components/ui/pagination";
import { WishPostModal } from "./WishPost/WishPostModal";
import { BlogPostModal } from "./BlogPost/BlogPostModal";


const PostManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPostType, setSelectedPostType] = useState("all"); // Always default to "all"

  const limit = 15;

  // Get posts based on current filters
  const { data: allPostsData, isLoading } = useGetAllPostsQuery({
    page: currentPage,
    limit: limit,
    search: searchTerm,
    postType: selectedPostType === "all" ? "" : selectedPostType, // Send empty string for "all"
  });

  console.log("allposts", allPostsData);
  console.log("pagination", allPostsData?.result?.meta?.totalPages);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<{
    id: string;
    type: string;
  } | null>(null);

  const handleViewClick = (id: string, type: string) => {
    console.log("post id",id);
    setSelectedPost({ id, type });
    setIsOpen(true);
  };

  const router = useRouter();
  const pathname = usePathname();

  // Keep default as "all" - don't change based on route
  // This ensures all posts are shown by default regardless of the route
  useEffect(() => {
    // You can optionally set different defaults based on route if needed in the future
    // For now, always show all posts by default
    setSelectedPostType("all");
  }, [pathname]);

  // Handle post type filter change
  const handlePostTypeChange = (value: string) => {
    setSelectedPostType(value);
    setCurrentPage(1); // Reset to first page when changing filter

    // Optional: Navigate to different routes based on filter
    // if (value === "Wish") {
    //   router.push("/admin/post-Management");
    // } else if (value === "Blog") {
    //   router.push("/admin/blogPost-Management");
    // }
  };

  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");
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
      case "used":
        return {
          variant: "secondary" as const,
          className: "bg-[#08E9DB] text-white px-5 py-1 text-base",
        };
      case "new":
        return {
          variant: "secondary" as const,
          className: "bg-[#10B981] text-white px-5 py-1 text-base",
        };
      default:
        return {
          variant: "secondary" as const,
          className: "bg-gray-200 text-gray-800 px-5 py-1 text-base",
        };
    }
  };

  // Get page title based on current filter
  const getPageTitle = () => {
    switch (selectedPostType) {
      case "Wish":
        return "Wish Posts";
      case "Blog":
        return "Blog Posts";
      default:
        return "All Posts";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-white">
        <div className="flex items-center justify-center space-x-2">
          <Loading />
        </div>
      </div>
    );
  }

  return (

    <section>
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="w-full space-y-4">
          {/* Header with search and filter */}
          <div className="flex lg:flex-row flex-col items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {getPageTitle()}
            </h2>
            <div className="flex lg:flex-row flex-col items-center gap-4">
              {/* Search Box - searches by productName */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by product name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pr-10 py-2 lg:w-48 bg-white border-gray-200 focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              {/* Filter by Post Type */}
              <Select
                value={selectedPostType}
                onValueChange={handlePostTypeChange}
              >
                <SelectTrigger className="w-40">
                  <Filter className="h-5 w-5" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="hover:bg-[#08E9DB]/20">
                    All Posts
                  </SelectItem>
                  <SelectItem
                    value="Wish"
                    className="data-[state=checked]:bg-[#08E9DB] hover:bg-[#08E9DB]/20"
                  >
                    Wish Posts
                  </SelectItem>
                  <SelectItem
                    value="Blog"
                    className="data-[state=checked]:bg-[#08E9DB] hover:bg-[#08E9DB]/20"
                  >
                    Blog Posts
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count and active filters */}
          {allPostsData?.result?.meta && (
            <div className="flex items-center justify-between text-sm text-gray-600">
              {/*    <div>
                Showing {allPostsData.result.posts.length} of {allPostsData.result.meta.totalPosts} results
              </div> */}
              <div className="flex items-center gap-2">
                {searchTerm && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Search: "{searchTerm}"
                  </Badge>
                )}
                {selectedPostType !== "all" && (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700"
                  >
                    Type: {selectedPostType}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Table */}
          <div className="rounded-lg border bg-white overflow-hidden">
            <Table>
              <TableHeader className="bg-[#F8FAFC]">
                <TableRow className="border-b">
                  <TableHead className="text-base font-semibold">
                    Sl No:
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    User Name
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    Product Name
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    Post Date
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    Post Type
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
                        key={post._id || index}
                        className="border-b last:border-b-0"
                      >
                        <TableCell className="font-medium text-gray-900 py-3">
                          {String(
                            (currentPage - 1) * limit + index + 1
                          ).padStart(2, "0")}
                        </TableCell>
                        <TableCell className="font-medium text-gray-700 py-3">
                          <div className="flex items-center gap-2">
                            <Image
                              src={post.user?.profileImage || userImage}
                              alt="user image"
                              width={40}
                              height={40}
                              className="rounded-sm object-cover w-10 h-10"
                            />
                            <span>{post.user?.userName || "Unknown User"}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700 py-3 font-medium">
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
                        <TableCell className="py-3">
                          <Badge
                            variant="outline"
                            className={`${
                              post.postType === "Wish"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}
                          >
                            {post.postType}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-700 space-x-3">
                          <Button
                            onClick={() =>
                              handleViewClick(post?.id, post.postType)
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
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-gray-500 text-lg">
                          No posts found
                        </div>
                        {searchTerm || selectedPostType !== "all" ? (
                          <div className="text-gray-400 text-sm">
                            Try adjusting your search or filter criteria
                          </div>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {isOpen && selectedPost?.type === "Wish" && (
        <WishPostModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          itemId={selectedPost?.id}
        />
      )}

      {isOpen && selectedPost?.type === "Blog" && (
        <BlogPostModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          itemId={selectedPost?.id}
        />
      )}

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

export default PostManagement;
