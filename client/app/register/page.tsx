import { Box } from "@mui/material";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
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
      <RegisterForm />
    </Box>
  );
}
