"use client";
import React, { useState, MouseEvent } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
// import { ConnectKitButton } from "connectkit";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Avatar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Icon,
} from "@mui/material";
import ConnectWalletButton from "@/app/Web3Provider";

const pages = [
  { name: "markets", icon: <LocalGroceryStoreIcon /> },
  { name: "portfolio", icon: <AccountBalanceWalletIcon /> },
  { name: "leaderboard", icon: <LeaderboardIcon /> },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let router = useRouter();

  // const handleCreateNavigation = () => {
  //   router.push("/create");
  // };
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", boxShadow: 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ textTransform: "capitalize" }}
                >
                  <Link href={`/${page.name}`} key={page.name}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Icon fontSize={"small"}> {page.icon}</Icon>

                      <Typography textAlign="center">{page.name}</Typography>
                    </Box>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link href={"/"}>
            <Box
              component="img"
              sx={{ height: 44, display: { xs: "none", md: "flex" }, mr: 1 }}
              alt="logo"
              src={
                "https://xparametric.com/images/19bfaeaef18b7ffa151871e3709e43b5.svg"
              }
            />
          </Link>
          <Link href={"/"}>
            <Box
              component="img"
              sx={{
                height: 44,
                display: { xs: "flex", md: "none" },
                mr: 6,
              }}
              alt="logo"
              src={
                "https://xparametric.com/images/19bfaeaef18b7ffa151871e3709e43b5.svg"
              }
            />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link href={`/${page.name}`} key={page.name} passHref>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </Button>
              </Link>
            ))}
          </Box>
          <Link href={"/create"}>
            {" "}
            <Button sx={{ mx: 1 }}>
              <AddBoxIcon /> Create
            </Button>
          </Link>
          {/* <ConnectKitButton /> */}
          <ConnectWalletButton />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Sharp" src="/static/images/avatar/2.jpg" /> */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
