import { useMemo } from "react";
import { DataGrid, type GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box, Tooltip, Avatar } from "@mui/material";
import type { User } from "../interfaces/User";
 
interface Props {
  users: User[];
}
 
export const UserGrid = ({ users }: Props) => {
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "picture",
        headerName: "Avatar",
        width: 80,
        sortable: false,
        filterable: false,
        renderCell: (params) => <Avatar src={params.value} />,
      },
      {
        field: "name",
        headerName: "Full Name",
        width: 200,
        renderCell: (params) => (
          <Tooltip title={params.value}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {params.value}
            </span>
          </Tooltip>
        ),
      },
      {
        field: "email",
        headerName: "Email",
        width: 250,
        renderCell: (params) => (
          <Tooltip title={params.value}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {params.value}
            </span>
          </Tooltip>
        ),
      },
      {
        field: "phone",
        headerName: "Phone",
        width: 150,
      },
      {
        field: "city",
        headerName: "City",
        width: 130,
      },
      {
        field: "country",
        headerName: "Country",
        width: 130,
      },
    ],
    []
  );
 
  return (
    <Box sx={{ height: 600, width: "100%", mt: 4 }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        components={{ Toolbar: GridToolbar }}
        sx={{
          "& .MuiDataGrid-cell": {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        }}
      />
    </Box>
  );
};