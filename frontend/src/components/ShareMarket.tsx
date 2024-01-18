import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import { Box, IconButton, Tooltip } from "@mui/material";

const ShareMarket = () => {
  const handleShareClick = () => {
    const tweetMessage = "Check out this awesome market!";

    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetMessage
    )}`;

    window.open(tweetUrl, "_blank");
  };

  return (
    <Box display="flex" alignItems="center">
      <Tooltip title="Share this Market on Twitter">
        <IconButton
          disableRipple
          onClick={handleShareClick}
          aria-label="Share on Twitter"
          sx={{
            p: 1,
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          <ShareIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ShareMarket;
