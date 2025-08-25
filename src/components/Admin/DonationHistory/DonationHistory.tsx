/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import userImage from "@/assets/User.png";
import user2Image from "@/assets/User.png";
import { useGetAllDonationsQuery } from "@/redux/api/donationApi";
import { Loading } from "@/components/ui/loading";

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

const DonationHistory = () => {
  const { data: allDonation, isLoading } = useGetAllDonationsQuery({});
  console.log("allDonation", allDonation);



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
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Donation History
            </h2>
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
                    Donor Name
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    Receiver
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    Amount
                  </TableHead>
                  <TableHead className=" text-base font-semibold">
                    Product Name
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allDonation?.result.map((item: any, index: any) => (
                  <TableRow key={item.id} className="border-b last:border-b-0">
                    <TableCell className="font-medium text-gray-900 py-3">
                      0{index + 1}
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
                     {item?.user?.userName }
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-700  flex justify-start items-center gap-2">
                        <div>
                          <Image
                            src={item?.post?.user?.profileImage|| user2Image}
                            alt="image"
                            width={40}
                            height={40}
                            className="rounded-sm object-cover w-10 h-10"
                          />
                        </div>{" "}
                        {item?.post?.user?.userName || "not found"}
                      </div>
                    </TableCell>
                    <TableCell className="py-3">€{item?.amount}</TableCell>
                    <TableCell className="py-3">{item?.post?.productName}</TableCell>
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

export default DonationHistory;
