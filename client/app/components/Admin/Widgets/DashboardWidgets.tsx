import React, { FC } from 'react';
import UserAnalytics from '../Analytics/UserAnalytics';
import OrderAnalytics from '../Analytics/OrderAnalytics';
import { BiBorderLeft } from 'react-icons/bi';
import { PiUsersFourLight } from 'react-icons/pi';
import { CircularProgress, Box } from "@mui/material";
import AllInvoices from '../Order/AllInvoices';

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  return (
    <div className="mt-[30px] min-h-screen">
      {/* ====== First Row: Graph + Small Cards ====== */}
      <div className="flex flex-row w-full min-h-[480px] gap-4"> {/* Added gap between columns */}

        {/* Left Column - User Analytics */}
        <div className="w-[75%] p-6">
          <div className="w-full h-full bg-blue-50 dark:bg-[#111C43] rounded-lg shadow">
            <UserAnalytics isDashboard={true} />
          </div>
        </div>

        {/* Right Column - Cards */}
        <div className="w-[25%] flex flex-col gap-6 pt-[50px] scale-[0.90]"> {/* Reduced card size */}
          
          {/* Sales Card */}
          <div className="w-full dark:bg-[#111C43] rounded-lg shadow p-4 h-[210px] flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div>
                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[28px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[18px]">
                  120
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[16px] font-[400]">
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={100} open={open} />
                <h5 className="text-center pt-4 text-sm">+120%</h5>
              </div>
            </div>
          </div>

          {/* Users Card */}
          <div className="w-full dark:bg-[#111C43] rounded-lg shadow p-4 h-[210px] flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div>
                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[28px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[18px]">
                  450
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[16px] font-[400]">
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={100} open={open} />
                <h5 className="text-center pt-4 text-sm">+150%</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====== Space between rows ====== */}
      <div className="my-12"></div> {/* Added vertical spacing between top and bottom row */}

      {/* ====== Second Row: Order Analytics + Invoices ====== */}
      <div className="flex flex-row w-full min-h-[320px] gap-4">

        {/* Left Column - Order Analytics */}
        <div className="w-[65%]">
          <div className="w-full h-full dark:bg-[#111c43] rounded-lg shadow">
            <OrderAnalytics isDashboard={true} />
          </div>
        </div>

        {/* Right Column - Recent Transactions */}
        <div className="w-[35%] flex flex-col pl-2">
          <div className="w-full dark:bg-primary rounded-lg shadow p-5 h-full flex flex-col">
            <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3">
              Recent Transactions
            </h5>
            <div className="flex-grow overflow-auto">
              <AllInvoices isDashboard={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
