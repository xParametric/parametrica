import React, { useState } from "react";

const BookmarkMarket = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkToggle = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="flex">
      <div
        className="tooltip"
        data-tip={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
      >
        <button
          onClick={handleBookmarkToggle}
          className="text-blue-400 hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isBookmarked ? (
            /* Replace with BookmarkAddedIcon equivalent SVG */
            <></>
          ) : (
            /* Replace with BookmarkAddIcon equivalent SVG */
            <></>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookmarkMarket;
