"use client";
import Link from "next/link";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import router from "next/router";
export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <AppBar position='static'>
      {" "}
      <Toolbar>
        {" "}
        <Typography
          variant='h6'
          component={Link}
          href='/'
          sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
        >
          {" "}
          My Blog{" "}
        </Typography>{" "}
        <Button color='inherit' component={Link} href='/posts'>
          {" "}
          Posts{" "}
        </Button>{" "}
        {isAuthenticated ? (
          <>
            <Button color='inherit' component={Link} href='/posts/create'>
              {" "}
              Create Post{" "}
            </Button>
            <Button color='inherit' onClick={logout}>
              {" "}
              Logout{" "}
            </Button>
            <Button color='inherit' component={Link} href='/profile'>
              {" "}
              My Profile{" "}
            </Button>
          </>
        ) : (
          <>
            {" "}
            <Button color='inherit' component={Link} href='/login'>
              {" "}
              Login{" "}
            </Button>{" "}
            <Button color='inherit' component={Link} href='/register'>
              {" "}
              Register{" "}
            </Button>{" "}
          </>
        )}{" "}
      </Toolbar>{" "}
    </AppBar>
  );
}
