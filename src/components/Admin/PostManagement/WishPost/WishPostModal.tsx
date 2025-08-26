/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, Play } from "lucide-react";
import Image from "next/image";
import user2 from "@/assets/images/user2.png";
import laptop from "@/assets/images/Laptop.png";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useGetSinglePostQuery } from "@/redux/api/postApi";
import { Loading } from "@/components/ui/loading";
import { useUpdateStatusMutation } from "@/redux/api/donationApi";

interface WishPostModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  itemId?: string | number;
}

export const WishPostModal: React.FC<WishPostModalProps> = ({
  isOpen,
  onClose,
  itemId,
}) => {
  console.log("from wish list id", itemId);
  const { data: getSingleWishPost, isLoading } = useGetSinglePostQuery(itemId);
  console.log("getSingleWishPost", getSingleWishPost);

  const [statusUpdate, { isLoading: isUpdating }] = useUpdateStatusMutation();

  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setVideoError(false);
      setImageError(false);
      setImageLoaded(false);
    }
  }, [isOpen]);

  const handlePlayVideo = () => {
    if (getSingleWishPost?.result?.videoUrl) {
      console.log("Playing video:", getSingleWishPost.result.videoUrl);
      setIsPlaying(true);
      setVideoError(false);

      // Small delay to ensure the video element is rendered
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load(); // Reload the video source
          videoRef.current.play().catch((error) => {
            console.error("Error playing video:", error);
            setVideoError(true);
            setIsPlaying(false);
          });
        }
      }, 100);
    } else {
      console.warn("No video URL available");
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

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
      <DialogContent className="sm:max-w-[95%] md:max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">
            Wish Post Details
          </DialogTitle>
        </DialogHeader>
        <div className="pt-2 md:pt-4">
          <div className="w-full mx-auto bg-white">
            <div className="p-2 md:p-4">
              {/* Header with user info */}
              <div className="flex items-start md:items-center justify-between mb-4">
                <div className="flex justify-start items-start md:items-center gap-3">
                  <div className="flex-shrink-0">
                    <Avatar className="w-12 h-12 md:w-16 md:h-16">
                      <AvatarImage
                        src={
                          getSingleWishPost?.result?.user?.profileImage ||
                          user2.src
                        }
                        alt={
                          getSingleWishPost?.result?.user?.userName || "User"
                        }
                      />
                      <AvatarFallback>
                        {getSingleWishPost?.result?.user?.userName
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 md:gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900 text-base md:text-xl truncate">
                        {getSingleWishPost?.result?.user?.userName ||
                          "Unknown User"}
                      </h3>
                      {getSingleWishPost?.result?.user?.isVerified && (
                        <RiVerifiedBadgeFill className="w-4 h-4 md:w-5 md:h-5 text-[#52C41A] flex-shrink-0" />
                      )}
                    </div>
                    {/* Location and timestamp */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <div className="flex justify-start items-center gap-1 text-gray-400">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                        <p className="text-xs md:text-sm truncate">
                          {getSingleWishPost?.result?.user?.address ||
                            "not found"}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <span className="w-[6px] h-[6px]  rounded-full bg-gray-400 mr-2 ml-3"></span>
                        <p className="text-xs md:text-sm text-gray-500">
                          {getSingleWishPost?.result?.createdAt
                            ? formatTimeAgo(
                                getSingleWishPost?.result?.createdAt
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
                      src={getSingleWishPost?.result?.mediaUrl || laptop}
                      alt={getSingleWishPost?.result?.productName || "Product"}
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
                      {getSingleWishPost?.result?.productName ||
                        "Product Name Not Available"}
                    </h4>
                    <p className="text-sm md:text-base font-normal text-gray-400">
                      ${getSingleWishPost?.result?.price || "N/A"}
                    </p>
                    {/* {getSingleWishPost?.result?.status && (
                      <p className="text-xs md:text-sm text-gray-500">
                        Status: {getSingleWishPost.result.status}
                      </p>
                    )} */}
                  </div>
                </div>
              </div>

              {/* Post content */}
              <div className="text-sm text-gray-700 leading-relaxed mb-4">
                <p className="break-words">
                  {getSingleWishPost?.result?.postBody ||
                    "No description available"}
                </p>
              </div>

              {/* Video/Media section */}
              {(getSingleWishPost?.result?.videoUrl ||
                getSingleWishPost?.result?.mediaUrl) && (
                <div className="mt-4 md:mt-6 rounded-lg overflow-hidden relative">
                  {!isPlaying ? (
                    <div
                      className="relative cursor-pointer group"
                      onClick={handlePlayVideo}
                    >
                      {/* Thumbnail image */}
                      <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
                        {getSingleWishPost?.result?.mediaUrl && !imageError ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={getSingleWishPost?.result?.mediaUrl}
                              alt="Video thumbnail"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                              priority
                              onLoad={() => {
                                console.log(
                                  "Thumbnail loaded successfully:",
                                  getSingleWishPost.result.mediaUrl
                                );
                                setImageError(false);
                                setImageLoaded(true);
                              }}
                              onError={(e) => {
                                console.error(
                                  "Thumbnail failed to load:",
                                  getSingleWishPost.result.mediaUrl
                                );
                                setImageError(true);
                              }}
                            />
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <div className="text-center text-gray-500">
                              <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
                                <Play className="w-8 h-8" />
                              </div>
                              <p className="text-sm">No Thumbnail Available</p>
                            </div>
                          </div>
                        )}

                        {/* Loading state */}
                        {getSingleWishPost?.result?.mediaUrl &&
                          !imageLoaded &&
                          !imageError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                              <div className="text-gray-400">Loading...</div>
                            </div>
                          )}
                      </div>

                      {/* Play button overlay */}
                      {getSingleWishPost?.result?.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity group-hover:bg-opacity-40 rounded-lg">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-6 h-6 md:w-8 md:h-8 text-[#08E9DB] fill-current ml-1" />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                      {getSingleWishPost?.result?.videoUrl ? (
                        <video
                          ref={videoRef}
                          controls
                          controlsList="nodownload"
                          className="w-full h-full object-contain"
                          onEnded={handleVideoEnded}
                          onPause={() => {
                            console.log("Video paused");
                            // Don't automatically set isPlaying to false on pause
                            // Let user control this with the video controls
                          }}
                          onPlay={() => {
                            console.log("Video playing");
                            setIsPlaying(true);
                          }}
                          onError={(e) => {
                            console.error(
                              "Video failed to load:",
                              getSingleWishPost.result.videoUrl,
                              e
                            );
                            setVideoError(true);
                            setIsPlaying(false);
                          }}
                          onLoadStart={() => {
                            console.log(
                              "Video loading started:",
                              getSingleWishPost.result.videoUrl
                            );
                          }}
                          onLoadedData={() => {
                            console.log("Video data loaded");
                          }}
                          preload="metadata"
                          playsInline
                          webkit-playsinline="true"
                        >
                          <source
                            src={getSingleWishPost.result.videoUrl}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <div className="text-center text-gray-500">
                            <p className="text-sm">No video available</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Back to thumbnail button when video is playing */}
                  {isPlaying && !videoError && (
                    <div className="absolute top-2 left-2 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlaying(false);
                          if (videoRef.current) {
                            videoRef.current.pause();
                            videoRef.current.currentTime = 0;
                          }
                        }}
                        className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs hover:bg-opacity-70 transition-opacity"
                      >
                        ← Back
                      </button>
                    </div>
                  )}

                  {videoError && (
                    <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <p className="text-sm">Unable to load video</p>
                        <p className="text-xs mt-1">
                          Please check your connection
                        </p>
                        <button
                          onClick={() => {
                            setVideoError(false);
                            setIsPlaying(false);
                          }}
                          className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                        >
                          Retry
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

           
              {/* Approve and reject buttons */}
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


            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
