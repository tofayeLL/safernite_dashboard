"use client";

import React from "react";
import DashboardStat from "./DashboardStat";

import ActivityTeamChart from "./CasesReportChart";
import DashboardNewUsers from "./DashboardNewUsers";
import UserManagement from "./UserManagement";
import DonationOverview from "./DonationOverview";

const DashboardLayout = () => {
  return (
    <section className="space-y-8">

      <DashboardStat />
      
      <div>
        <div className="  grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <ActivityTeamChart />
          </div>
          <div className="col-span-1">
            <DashboardNewUsers></DashboardNewUsers>
          </div>
        </div>    
      </div>



      <div>
        <div className="  grid grid-cols-3 gap-6">
          <div className="col-span-2">
              <UserManagement></UserManagement>
          </div>
          <div className="col-span-1">
            <DonationOverview></DonationOverview>
          </div>
        </div>    
      </div>

    
    </section>
  );
};

export default DashboardLayout;
