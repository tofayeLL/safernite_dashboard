"use client";

import React from "react";



const DashboardStat = () => {
/* const {data:allStatsData, isLoading} = useGetAllAdminAnalysisQuery({})

console.log("...",allStatsData); */

/*   if (isLoading) {
     return (
       <div className="flex items-center justify-center min-h-[70vh] bg-white">
         <div className="flex items-center justify-center space-x-2">
           <Loading></Loading>
         </div>
       </div>
     );
   } */
 

  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Card 1 */}
  <div className="bg-white rounded-xl shadow py-16">
    <div className="flex flex-col items-center text-center">
      <h1 className="font-medium text-lg text-gray-600">
        Total Verified User
      </h1>
      <p className="text-3xl font-bold text-gray-900 mt-3">360</p>
    </div>
  </div>

  {/* Card 2 */}
  <div className="bg-white rounded-xl shadow py-16">
    <div className="flex flex-col items-center text-center">
      <h1 className="font-medium text-lg text-gray-600">
       Total Post
      </h1>
      <p className="text-3xl font-bold text-gray-900 mt-3">250</p>
    </div>
  </div>

  {/* Card 3 */}
  <div className="bg-white rounded-xl shadow py-16">
    <div className="flex flex-col items-center text-center">
      <h1 className="font-medium text-lg text-gray-600">
       Selected Parson
      </h1>
      <p className="text-3xl font-bold text-gray-900 mt-3">40%</p>
    </div>
  </div>

  {/* Card 4 */}
  <div className="bg-white rounded-xl shadow py-16">
    <div className="flex flex-col items-center text-center">
      <h1 className="font-medium text-lg text-gray-600">
        Total Earning
      </h1>
      <p className="text-3xl font-bold text-gray-900 mt-3">$25,500</p>
    </div>
  </div>
</div>
  );
};

export default DashboardStat;
