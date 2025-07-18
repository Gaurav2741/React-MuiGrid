import React, { useEffect, useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import UserGrid from "./components/UserGrid";
import userService from "./services/userService";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        React Solid Principle
      </Typography>
      {loading ? <CircularProgress /> : <UserGrid users={users} />}
    </Container>
  );
};

export default App;