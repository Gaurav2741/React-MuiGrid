import { useEffect, useState } from "react";
import { fetchUsers } from "../api/userService";
import type { User } from "../interfaces/User";
import { UserGrid } from "../components/UserGrid";
import { CircularProgress, Container, Typography } from "@mui/material";
 
const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
 
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setError(false);
      } catch{
        setError(true);
      } finally {
        setLoading(false);
      }
    };
 
    loadUsers();
  }, []);
 
  if (loading)
    return <CircularProgress sx={{ mt: 10, mx: "auto", display: "block" }} />;
  if (error)
    return <Typography color="error" sx={{ mt: 4 }}>
      Error loading users.
    </Typography>;
 
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        User List
      </Typography>
      <UserGrid users={users} />
    </Container>
  );
};
 
export default HomePage;
 