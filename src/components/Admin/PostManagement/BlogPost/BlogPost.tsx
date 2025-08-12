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
import { BlogPostModal } from "./BlogPostModal";

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

const BlogPost = () => {
  const [selectedCategory, setSelectedCategory] = useState("blog");

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
    if (value === "wish") {
      router.push("/admin/post-Management");
    } else if (value === "blog") {
      router.push("/admin/post-Management/blogPost-Management");
    }
  };

  return (
    <section>
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="w-full space-y-4">
          {/* Header with filters */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Blog Post</h2>
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
                               <SelectItem   value="wish"    className="data-[state=checked]:bg-[#08E9DB] hover:bg-[#08E9DB]/20">Wish Post</SelectItem>
                               <SelectItem value="blog" className="data-[state=checked]:bg-[#08E9DB] hover:bg-[#08E9DB]/20">Blog Post</SelectItem>
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
                    Sl No:
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    User Name
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    Product
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    Post Date
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    Status
                  </TableHead>

                  <TableHead className=" text-base font-semibold">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b last:border-b-0">
                  <TableCell className="font-medium text-gray-900 py-3">
                    01
                  </TableCell>
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
                  <TableCell className="text-gray-700 py-3">Laptop</TableCell>
                  <TableCell className="py-3">30-08-2025</TableCell>
                  <TableCell className="py-3">
                    <Badge
                      variant="secondary"
                      className="bg-[#52C41A33] text-[#52C41A] px-5 py-1 text-base"
                    >
                      Approved
                    </Badge>
                  </TableCell>

                  <TableCell className="text-gray-700 py-3 space-x-3 ">
                    <Button
                      onClick={() => handleViewClick("123")}
                      variant="outline"
                      className="bg-blue-50 w-[40%] text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300 px-4 py-2 rounded-sm font-medium transition-colors"
                    >
                      View
                    </Button>

                      <BlogPostModal
                                          isOpen={isOpen}
                                          onClose={() => setIsOpen(false)}
                                          itemId={selectedId}
                                        />
                    

                    <Button
                      variant="outline"
                      className="bg-red-50 w-[40%] text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700 hover:border-red-300 px-4 py-2 rounded-sm font-medium transition-colors"
                    >
                      Delete
                    </Button>
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

export default BlogPost;
