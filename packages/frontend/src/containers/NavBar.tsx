import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useAppContext } from "../lib/contextLib";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

export default function MenuAppBar() {
  const nav = useNavigate();
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  const handleLogOut = async () => {
    await Auth.signOut();
    userHasAuthenticated && userHasAuthenticated(false);
    nav("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* {isAuthenticated && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )} */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Credenciales
          </Typography>
          {isAuthenticated && (
            <div>
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleLogOut}
                color="inherit"
              >
                Log Out
              </Button>
            </div>
          )}
          {/* {!isAuthenticated && (
            <div>
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                href="/login"
              >
                Log In
              </Button>
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                href="/signup"
              >
                Sign Up
              </Button>
            </div>
          )} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
