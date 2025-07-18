import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";

const UserGrid = ({ users }) => {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      sortable: true,
      renderCell: (params) => (
        <Tooltip title={`Username: ${params.row.username}`}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      sortable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 180,
    },
    {
      field: "company",
      headerName: "Company",
      width: 200,
      valueGetter: (params) => params.row.company?.name,
      renderCell: (params) => (
        <Tooltip title={`Catchphrase: ${params.row.company?.catchPhrase}`}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "website",
      headerName: "Website",
      width: 200,
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default UserGrid;
