"use client";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import TwitterIcon from "@mui/icons-material/Twitter";
import Link from "next/link";
import { Grid, Box, Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color=" gray" align="center">
      {"Copyright © "}
      <Link style={{ textDecoration: "none", color: "gray" }} href={"/"}>
        Parametrica
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Footer = () => {
  return (
    <footer>
      <Box
        sx={{ bgcolor: "primary.main", p: 6, color: "#ffffff", mt: 6 }}
        component="footer"
      >
        {/* <Grid container>
          <Grid item md={5} lg={4} xl={3} xs={12}>
            <Link
              href={"/"}
              style={{
                textDecoration: "none",
                color: "#EFECEC",
              }}
            >
              <Typography
                variant="h3"
                component={"h1"}
                sx={{
                  textDecoration: "none",
                  color: "#EFECEC",
                  ":hover": {
                    color: "background.paper",
                  },
                }}
              >
                Parametrica
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} xl={3} sm={3} md={3} lg={3}>
            <Box m={1}>
              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#EFECEC",
                    ":hover": {
                      color: "background.paper",
                    },
                  }}
                >
                  Home
                </Typography>
              </Link>
            </Box>

            <Box m={1}>
              <Link
                href="https://docs.parametrica.dev/"
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#EFECEC",
                    ":hover": {
                      color: "background.paper",
                    },
                  }}
                >
                  Documentation
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} xl={3} sm={3} md={3} lg={3}>
            <Box m={1}>
              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#EFECEC",
                    ":hover": {
                      color: "background.paper",
                    },
                  }}
                >
                  About
                </Typography>
              </Link>
            </Box>
            <Box m={1}>
              <Link
                href="mailhref:info@parametrica.dev"
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#EFECEC",
                    // textTransform: "unset",
                    ":hover": {
                      color: "background.paper",
                    },
                  }}
                >
                  Contact us
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} xl={3} sm={3} md={3} lg={2}>
            <Box m={1}>
              <Box>
                <Link href="/" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#EFECEC",
                      ":hover": {
                        color: "background.paper",
                      },
                    }}
                  >
                    Follow us
                  </Typography>
                </Link>
              </Box>
              <Box display={"flex"}>
                <Box>
                  <Link
                    href="https://github.com/xParametric"
                    target={"_blank"}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#EFECEC",
                        ":hover": {
                          color: "background.paper",
                        },
                      }}
                    >
                      <GitHubIcon
                        sx={{
                          width: 20,
                        }}
                      />
                    </Typography>
                  </Link>
                </Box>
                <Box mx={1}>
                  <Link href="/" style={{ textDecoration: "none" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#EFECEC",
                        ":hover": {
                          color: "background.paper",
                        },
                      }}
                    >
                      <TwitterIcon
                        sx={{
                          width: 20,
                        }}
                      />
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} xl={3} sm={3} md={3} lg={3}></Grid>
        </Grid> */}
        <Grid container justifyContent={"center"}>
          <Box>
            <Copyright />
          </Box>
        </Grid>
      </Box>
    </footer>
  );
};

export default Footer;
