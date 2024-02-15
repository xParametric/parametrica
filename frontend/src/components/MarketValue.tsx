const MarketValue = () => {
  return (
    <div className="flex items-center">
      <div className="tooltip" data-tip="Market Value">
        <div className="flex items-center">
          {/* <LeaderboardIcon className="h-5 w-5" /> */}
        </div>
      </div>
      <span className="text-sm font-medium">
        {/* {formattedMarketValue} */}K
      </span>
    </div>
  );
};

export default MarketValue;
