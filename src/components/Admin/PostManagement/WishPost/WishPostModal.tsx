/* eslint-disable react/jsx-no-undef */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
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
import videoThumbnail from "@/assets/images/videoThumbnail.png";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useRef, useState } from "react";

interface WishPostModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  itemId?: string | number;
}

export const WishPostModal: React.FC<WishPostModalProps> = ({
  isOpen,
  onClose,
  //   itemId,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  const handlePauseVideo = () => {
    setIsPlaying(false);
    videoRef.current?.pause();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[45%]">
        <DialogHeader>
          <DialogTitle>Wish Post Details</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Card className="w-full max-w-6xl mx-auto bg-white shadow-sm">
            <CardContent className="p-4">
              {/* Header with user info and close button */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex justify-center items-center gap-3">
                  <div className="">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={user2.src} alt="Lili Walker" />
                      <AvatarFallback>LW</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900 text-xl">
                        Lili Walker
                      </h3>
                      <RiVerifiedBadgeFill className="w-5 h-5 text-[#52C41A]" />
                    </div>
                    {/* Timestamp */}
                    <div className="flex items-center gap-2">
                      <div className="flex justify-start items-center gap-[2px] text-gray-400">
                        <span>
                          <MapPin className="w-4 h-4" />
                        </span>
                        <p className="text-sm">USA</p>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center">
                        {" "}
                        <span className="w-1 h-1 rounded-full bg-gray-400 mr-2"></span>
                        3 days ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product listing */}
              <div className="bg-[#F3F4F6] rounded-lg p-3 mb-4 my-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={laptop}
                      alt="MacBook Pro 14"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className=" text-gray-900 font-semibold text-lg">
                      MacBook Pro 14{" "}
                    </h4>
                    <p className="text-base font-normal text-gray-400">
                      $2,499
                    </p>
                  </div>
                </div>
              </div>

              {/* Post content */}
              <div className="text-sm text-gray-700 leading-relaxed">
                <p>
                  I need this laptop for my computer science studies. As a
                  single mother, I cannot afford it but it would help me
                  complete my degree I need this laptop for my computer science
                  studies. As a single mother, I cannot afford it but it would
                  help me complete my degree. I need this laptop for my computer
                  science studies. As a single mother, I cannot afford it but it
                  would help me complete my degree. I need this laptop for my
                  computer science studies. As a single mother, I cannot afford
                  it but it would help me complete my degree. I need this laptop
                  for my computer science studies. As a single mother, I cannot
                  afford it but it would help me complete my degree. I need this
                  laptop for my computer
                </p>
              </div>

              {/* Video section */}
              <div className="mt-6 rounded-lg overflow-hidden relative">
                {!isPlaying ? (
                  <div
                    className="relative cursor-pointer group"
                    onClick={handlePlayVideo}
                  >
                    {/* Thumbnail image */}
                    <Image
                      src={videoThumbnail}
                      alt="Video thumbnail"
                      width={800}
                      height={450}
                      className="w-full h-auto object-cover rounded-lg"
                    />

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-30 transition-opacity group-hover:bg-opacity-40">
                      <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-[#08E9DB] fill-current" />
                      </div>
                    </div>

                    {/* Video title/duration overlay (optional) */}
                    <div className="absolute bottom-4 left-4 text-white">
                      {/* <span className="font-medium">Watch my story</span>
                <span className="ml-3 text-sm opacity-80">2:45</span> */}
                    </div>
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    controls
                    className="w-full rounded-lg"
                    onEnded={handlePauseVideo}
                  >
                    <source src="/videos/blog-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
