"use client";
import React, { useState, MouseEvent } from "react";
import Link from "next/link";
// Assuming ConnectWalletButton is already adapted for Tailwind CSS
// import ConnectWalletButton from "@/app/Web3Provider";
import { useRouter } from "next/navigation";

// Icons
// import MenuIcon from "@mui/icons-material/Menu"; // Consider replacing with Tailwind CSS-friendly icons
// import LeaderboardIcon from "@mui/icons-material/Leaderboard";
// import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ConnectWalletButton from "../app/Web3Provider";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./theme-toggler";

const pages = [
  { name: "markets", icon: "" },
  { name: "portfolio", icon: "" },
  { name: "leaderboard", icon: "" },
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
  //   route
  return (
    <div className="w-full bg-transparent shadow">
      <div className="container px-4">
        <div className="flex justify-between items-center py-4">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={handleOpenNavMenu}>{/* <MenuIcon /> */}</button>
            {/* Conditional rendering for mobile menu */}
            {anchorElNav && (
              <div className="absolute top-0 left-0 w-full">
                <div
                  id="menu-appbar"
                  // anchorEl={anchorElNav}
                  // anchorOrigin={{
                  //   vertical: "bottom",
                  //   horizontal: "left",
                  // }}
                  // keepMounted
                  // transformOrigin={{
                  //   vertical: "top",
                  //   horizontal: "left",
                  // }}
                  // open={Boolean(anchorElNav)}
                  // onClose={handleCloseNavMenu}
                  // sx={{
                  //   display: { xs: "block", md: "none" },
                  // }}
                >
                  {pages.map((page) => (
                    <div
                      key={page.name}
                      onClick={handleCloseNavMenu}
                      // sx={{ textTransform: "capitalize" }}
                    >
                      <Link href={`/${page.name}`} key={page.name}>
                        <div>
                          <div> {page.icon}</div>

                          <p>{page.name}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Logo */}
          <Link href="/">
            <div>
              <img
                src="https://xparametric.com/images/19bfaeaef18b7ffa151871e3709e43b5.svg"
                alt="logo"
                className="h-11"
              />
            </div>
          </Link>
          {/* Desktop Menu Items */}
          <div className="hidden md:flex space-x-4">
            <Link href={"/"}>
              {/* <img
                alt="logo"
                src={
                  "https://xparametric.com/images/19bfaeaef18b7ffa151871e3709e43b5.svg"
                }
              /> */}
            </Link>
            {pages.map((page) => (
              <Link href={`/${page.name}`} key={page.name} passHref>
                <button
                  onClick={handleCloseNavMenu}
                  className="text-base uppercase py-2 px-4 dark:hover:text-[#bdff00] rounded"
                >
                  {page.name}
                </button>
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            <Button
              className="flex items-center mx-2 "
              onClick={() => {
                router.push("/create");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className=" bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              Create
            </Button>{" "}
            <div className="mr-2">
              {" "}
              <ModeToggle />
            </div>
            <ConnectWalletButton />
            {/* User Avatar and Dropdown Menu */}
            <button onClick={handleOpenUserMenu} className="ml-4">
              {/* <Avatar alt="Sharp" src="/static/images/avatar/2.jpg" /> */}
            </button>
            {anchorElUser && (
              <div className="absolute top-0 right-0 mt-12 mr-4 w-48 bg-white shadow-md rounded-md">
                {settings.map((setting) => (
                  <div key={setting} onClick={handleCloseUserMenu}>
                    <p>{setting}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
