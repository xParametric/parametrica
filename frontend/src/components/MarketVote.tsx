"use client";

import { useState } from "react";

interface MarketVoteProps {
  initialValue?: number;
}

const MarketVote: React.FC<MarketVoteProps> = ({ initialValue = 0 }) => {
  const [voteCount, setVoteCount] = useState(initialValue);

  const handleVoteUp = () => {
    setVoteCount((prevCount) => prevCount + 1);
  };

  const handleVoteDown = () => {
    setVoteCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  return (
    <div className="flex items-center">
      <button
        className="text-primary-300 hover:bg-transparent"
        onClick={handleVoteUp}
      >
        {/* <ThumbUpAltIcon className="h-5 w-5" /> */}
      </button>
      <div className="tooltip" data-tip={voteCount}>
        <span className="text-base font-medium">{voteCount}</span>
      </div>
      <button
        className="text-primary-300 hover:bg-transparent"
        onClick={handleVoteDown}
      >
        {/* <ThumbDownAltIcon className="h-5 w-5" /> */}
      </button>
    </div>
  );
};

export default MarketVote;
