/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { Loader } from "../../Loader/Loader";
import { format } from "timeago.js";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";

type Props = {
  isDashboard?: boolean;
};

// ✅ FIX: Removed nested AllInvoices declaration
const AllInvoices = ({ isDashboard }: Props) => {
  const { theme } = useTheme();
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});

  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: "mail",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail
                    className="dark:text-white text-black"
                    size={20}
                  />
                </a>
              );
            },
          },
        ]),
  ];

  const rows: any = [];

  // ✅ FIX: Avoid duplicate row; use only dynamic data from state
  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        created_at: format(item.createdAt),
      });
    });

  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-0"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "90vh"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": { border: "none", outline: "none" },

              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000", // ✅ dropdown icon
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000", // ✅ sort icon color
              },

              // ✅ Row style with hover and selection support
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor:
                  theme === "dark"
                    ? "#3a3a3a !important"
                    : "#f0f0f0 !important",
                color: theme === "dark" ? "#fff !important" : "#000 !important",
              },
              "& .MuiDataGrid-row:hover .MuiDataGrid-cell": {
                color: theme === "dark" ? "#fff !important" : "#000 !important",
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor:
                  theme === "dark"
                    ? "#4a4a4a !important"
                    : "#e8e8e8 !important",
                color: theme === "dark" ? "#fff !important" : "#000 !important",
              },
              "& .MuiDataGrid-row.Mui-selected .MuiDataGrid-cell": {
                color: theme === "dark" ? "#fff !important" : "#000 !important",
              },
              "& .MuiDataGrid-row.Mui-selected:hover": {
                backgroundColor:
                  theme === "dark"
                    ? "#5a5a5a !important"
                    : "#d8d8d8 !important",
                color: theme === "dark" ? "#fff !important" : "#000 !important",
              },

              // ✅ Column headers styling
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: isDashboard
                  ? theme === "dark"
                    ? "#3e4396"
                    : "#A4A9FC"
                  : theme === "dark"
                  ? "#3e4396"
                  : "#A4A9FC", // ✅ ensures dashboard also gets blue background
                borderBottom: "none",
              },

              "& .MuiDataGrid-columnHeader": {
                backgroundColor: isDashboard
                  ? theme === "dark"
                    ? "#3e4396"
                    : "#A4A9FC"
                  : theme === "dark"
                  ? "#3e4396"
                  : "#A4A9FC", // ✅ same fix applied
              },

              "& .MuiDataGrid-columnHeaderTitle": {
                color: "#fff !important",
                fontWeight: "bold", // ✅ bold header font
              },
              "& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitleContainer":
                {
                  color: "#fff !important",
                },

              // ✅ Cells and pagination
              "& .MuiDataGrid-cell": {
                borderBottom: "none !important",
                "&:focus": { outline: "none !important" },
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC", // ✅ footer color match header
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
              "& .MuiDataGrid-menuIconButton": {
                color: `#fff !important`,
              },
              "& .MuiDataGrid-iconButtonContainer": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection={!isDashboard}
              rows={rows}
              columns={columns}
              slots={isDashboard ? { toolbar: GridToolbar } : {}}
              sx={{
                "& .MuiDataGrid-columnSeparator": {
                  display: "none",
                },
              }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
