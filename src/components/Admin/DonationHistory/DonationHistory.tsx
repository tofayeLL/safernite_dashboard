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


 

  return (
    <section>
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="w-full space-y-4">
          {/* Header with filters */}
          <div >
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
                  Payment method
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
                 <TableCell  >
                   <div className="font-medium text-gray-700  flex justify-start items-center gap-2">
                     <div>
                      <Image
                        src={user2Image}
                        alt="image"
                        width={40}
                        height={40}
                        className="rounded-sm object-cover w-10 h-10"
                      />
                    </div>{" "}
                    User2
                   </div>
                  </TableCell>
                  <TableCell className="py-3">€10</TableCell>
                  <TableCell className="py-3">Stripe</TableCell>
                  
                   
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationHistory;
