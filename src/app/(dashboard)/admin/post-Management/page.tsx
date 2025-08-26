"use client";
import WishPost from "@/components/Admin/PostManagement/WishPost/WishPost";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { id } = useParams();
  console.log("params id from wishList post",id);
  return (
    <div>
      <WishPost />
    </div>
  );
};

export default Page;
