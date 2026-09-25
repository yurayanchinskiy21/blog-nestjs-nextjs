import { Box } from "@mui/material";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <LoginForm />
    </Box>
  );
}
