/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetUserAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";
import { Loader } from "../../Loader/Loader";
import { styles } from "@/app/styles/styles";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUserAnalyticsQuery({});

//   const analyticsData = [
//     { name: "January 2023", count: 440 },
//     { name: "February 2023", count: 8200 },
//     { name: "March 2023", count: 4033 },
//     { name: "April 2023", count: 4502 },
//     { name: "May 2023", count: 2042 },
//     { name: "June 2023", count: 3454 },
//     { name: "July 2023", count: 356 },
//     { name: "August 2023", count: 5667 },
//     { name: "September 2023", count: 1320 },
//     { name: "October 2023", count: 6526 },
//     { name: "November 2023", count: 5480 },
//     { name: "December 2023", count: 485 },
//   ];

  const analyticsData: any = [];

  data && data.users.last12Months.forEach((item: any) => {
    analyticsData.push({name: item.month, uv: item.count})
  });

  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`mt-[50px] shadow-sm pb-5 rounded-sm ${
            isDashboard ? "" : "bg-transparent"
          }`}
        >
          <div className={`${isDashboard ? "ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Users Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data{" "}
              </p>
            )}
          </div>
          <br />
          <br />
          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-[500px]"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height="100%"
            >
              <AreaChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
