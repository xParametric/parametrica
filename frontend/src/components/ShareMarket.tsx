import React from "react";

const ShareMarket = () => {
  const handleShareClick = () => {
    const tweetMessage = "Check out this awesome market!";

    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetMessage
    )}`;

    window.open(tweetUrl, "_blank");
  };

  return (
    <div className="flex items-center">
      <button
        className="p-2 hover:bg-transparent"
        onClick={handleShareClick}
        aria-label="Share on Twitter"
      >
        {/* <ShareIcon className="h-5 w-5" /> */}
      </button>
    </div>
  );
};

export default ShareMarket;
