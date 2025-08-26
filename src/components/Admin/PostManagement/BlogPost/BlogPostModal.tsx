/* eslint-disable react/jsx-no-undef */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin } from "lucide-react";
import Image from "next/image";
import user2 from "@/assets/images/user2.png";
import laptop from "@/assets/images/Laptop.png";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useGetSinglePostQuery } from "@/redux/api/postApi";
import { Loading } from "@/components/ui/loading";
import { useUpdateStatusMutation } from "@/redux/api/donationApi";

interface BlogPostModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  itemId?: string | number;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({
  isOpen,
  onClose,
  itemId,
}) => {
  console.log("blog post id", itemId);
  console.log("from wish list id", itemId);
  const { data: getSingleBlogPost, isLoading } = useGetSinglePostQuery(itemId);
  console.log("getSingleBlogPost", getSingleBlogPost);

  const [statusUpdate, { isLoading: isUpdating }] = useUpdateStatusMutation();

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  const handleApprove = async () => {
    try {
      const response = await statusUpdate({
        id: itemId,
        data: { status: "Accepted" },
      }).unwrap();

      console.log("Post approved:", response);
      // Optionally close the modal or show a success message
      onClose(false);
    } catch (error) {
      console.error("Failed to approve post:", error);
      // Handle error (show error message to user)
    }
  };

  const handleReject = async () => {
    try {
      const response = await statusUpdate({
        id: itemId,
        data: { status: "Rejected" },
      }).unwrap();

      console.log("Post rejected:", response);
      // Optionally close the modal or show a success message
      onClose(false);
    } catch (error) {
      console.error("Failed to reject post:", error);
      // Handle error (show error message to user)
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>
            Blog Post Details 
          </DialogTitle>
        </DialogHeader>
        <div className="pt-4">
          <Card className="w-full max-w-6xl mx-auto bg-white ">
            <CardContent className="pt-4">
              {/* Header with user info and close button */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex justify-center items-center gap-3">
                  <div className="">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={
                          getSingleBlogPost?.result?.user?.profileImage ||
                          user2.src
                        }
                        alt={
                          getSingleBlogPost?.result?.user?.userName || "User"
                        }
                      />
                      <AvatarFallback>
                        {getSingleBlogPost?.result?.user?.userName
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900 text-base md:text-xl truncate">
                        {getSingleBlogPost?.result?.user?.userName ||
                          "Unknown User"}
                      </h3>
                      {getSingleBlogPost?.result?.user?.isVerified && (
                        <RiVerifiedBadgeFill className="w-4 h-4 md:w-5 md:h-5 text-[#52C41A] flex-shrink-0" />
                      )}
                    </div>
                    {/* Timestamp */}
                    <div className="flex items-center gap-2">
                      <div className="flex justify-start items-center gap-[2px] text-gray-400">
                        <span>
                          <MapPin className="w-4 h-4" />
                        </span>
                        <p className="text-xs md:text-sm truncate">
                          {getSingleBlogPost?.result?.user?.address ||
                            "not found"}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="w-[6px] h-[6px] rounded-full bg-gray-400 mr-2 ml-3"></span>
                        <p className="text-xs md:text-sm text-gray-500">
                          {getSingleBlogPost?.result?.createdAt
                            ? formatTimeAgo(
                                getSingleBlogPost?.result?.createdAt
                              )
                            : "Recently"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product listing */}
              <div className="bg-[#F3F4F6] rounded-lg p-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={getSingleBlogPost?.result?.mediaUrl || laptop}
                      alt={getSingleBlogPost?.result?.productName || "Product"}
                      fill
                      className="object-cover"
                      sizes="48px"
                      onError={() => {
                        console.error("Product image failed to load");
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 font-semibold text-sm md:text-lg truncate">
                      {getSingleBlogPost?.result?.productName ||
                        "Product Name Not Available"}
                    </h4>
                    <p className="text-sm md:text-base font-normal text-gray-400">
                      ${getSingleBlogPost?.result?.price || "N/A"}
                    </p>
                    {/* {getSingleBlogPost?.result?.status && (
                      <p className="text-xs md:text-sm text-gray-500">
                        Status: {getSingleBlogPost.result.status}
                      </p>
                    )} */}
                  </div>
                </div>
              </div>

              {/* Post content */}
              <div className="text-sm text-gray-700 leading-relaxed mb-4">
                <p className="break-words">
                  {getSingleBlogPost?.result?.postBody ||
                    "No description available"}
                </p>
              </div>

              {/* Approve and reject buttons */}
              {getSingleBlogPost?.result?.isApproved === "Pending" && (
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 mt-6 md:mt-10">
                  <Button
                    onClick={handleApprove}
                    disabled={isUpdating}
                    className="w-full sm:w-auto bg-[#52C41A] hover:bg-green-600 disabled:bg-green-300 text-white px-6 md:px-7 py-2 md:py-3 rounded-md font-medium transition-colors cursor-pointer text-sm md:text-base"
                  >
                    {isUpdating ? "Processing..." : "Approved"}
                  </Button>

                  <Button
                    onClick={handleReject}
                    disabled={isUpdating}
                    className="w-full sm:w-auto bg-[#FF4D4F] hover:bg-red-600 disabled:bg-red-300 text-white px-6 md:px-7 py-2 md:py-3 rounded-md font-medium transition-colors cursor-pointer text-sm md:text-base"
                  >
                    {isUpdating ? "Processing..." : "Rejected"}
                  </Button>
                </div>
              )}
              {getSingleBlogPost?.result?.isApproved !== "Pending" && (
                <div className="flex justify-center items-center mt-6 md:mt-10">
                  <div className="px-4 py-2 bg-gray-100 rounded-md">
                    <p className="text-gray-700 font-medium">
                      Status:{" "}
                      <span className="capitalize">
                        {getSingleBlogPost?.result?.isApproved?.toLowerCase()}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
