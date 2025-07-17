/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useTheme } from "next-themes";
import { Loader } from "../../Loader/Loader";
import { format } from "timeago.js";
import { useDeleteUsersMutation, useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/styles";
import toast from "react-hot-toast";

type Props = {};

const AllUsers = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const { isLoading, data, refetch } = useGetAllUsersQuery({}, {refetchOnMountOrArgChange: true});
  const [deleteUser, {isSuccess: deleteSuccess, error: deleteError}] = useDeleteUsersMutation({});
  // const [updateUserRole, {isSuccess, error: updateError}] = useUpdateUserRoleMutation({});
  
//   useEffect(() => {
//     if (updateError) {
//         if ("data" in updateError) {
//             const errorMessage = updateError as any;
//             toast.error(errorMessage.data.message);
//         }
//     }

//     if (isSuccess) {
//         refetch();
//         toast.success("User role updated successfully");
//         setActive(false);
//     }

//     if (deleteSuccess) {
//         refetch();
//         toast.success("User deleted successfully!");
//         setOpen(false);
//     }

//     if (deleteError) {
//         if ("data" in deleteError) {
//             const errorMessage = deleteError as any;
//             toast.error(errorMessage.data.message);
//         }
//     }
// }, [updateError, isSuccess, deleteSuccess, deleteError, refetch, setActive, setOpen]);
  
useEffect(() => {
    if(deleteSuccess){
      setOpen(false);
      refetch();
      toast.success("Course Deleted Successfully!")
    }
    if(deleteError){
      if("data" in deleteError){
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [deleteSuccess, deleteError, refetch])

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "courses",
      headerName: "Purchased Courses",
      flex: 0.5,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.5,
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={() => {
              setOpen(!open);
              setUserId(params.id);
            }}
            sx={{ minWidth: "auto", padding: "8px" }}
          >
            <AiOutlineDelete className="dark:text-white text-black" size={20} />
          </Button>
        );
      },
    },
  ];

  const rows: any[] = [];

  if (data && data.courses) {
    data.email.forEach((item: any) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: format(item.createdAt),
      });
    });
  }

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
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
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: "#fff !important",
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                  color: "#fff !important",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  color: "#fff !important",
                  fontWeight: "bold",
                },
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                color: "#fff !important",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "#fff !important",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitleContainer":
                {
                  color: "#fff !important",
                },
              "& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitle": {
                color: "#fff !important",
              },
              "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader": {
                color: "#fff !important",
              },
              "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeaderTitle": {
                color: "#fff !important",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-[#111C43] rounded-lg shadow-lg p-6">
                <h1 className={`${styles.title}`}>
                  Are you sure you want to delete this user?
                </h1>
                <div className="flex w-full items-center justify-between mb-6 mt-4">
                  <div
                    className={`${styles.button} w-[120px] h-[30px] bg-[#57c7a1]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} w-[120px] h-[30px] bg-[#d63f3f]`}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
