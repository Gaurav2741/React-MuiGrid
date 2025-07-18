import React, { useEffect, useState } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { getRandomUsers } from "../services/userService";

const UserGrid = () => {
  const [users, setUsers] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRandomUsers(50);

      setUsers(data);
    };

    fetchData();
  }, []);

  const rows = users.map((user, index) => ({
    id: index,

    firstName: user.name.first,

    lastName: user.name.last,

    email: user.email,

    gender: user.gender,

    country: user.location.country,
  }));

  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1, minWidth: 150 },

    { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 150 },

    { field: "email", headerName: "Email", flex: 2, minWidth: 200 },

    { field: "gender", headerName: "Gender", flex: 1, minWidth: 100 },

    { field: "country", headerName: "Country", flex: 1, minWidth: 150 },
  ];

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <DataGridPro
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        columnReordering
        showToolbar
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
      />
    </div>
  );
};

export default UserGrid;
