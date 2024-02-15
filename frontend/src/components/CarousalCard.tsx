import { MarketProps } from "../../../types/index";

import BigNumber from "bignumber.js";
const CarousalCard: React.FC<MarketProps> = ({
  title,
  imageHash,
  totalYes,
  totalNo,
}) => {
  const ipfsBaseUrl = "https://ipfs.io/ipfs/";

  const formattedImageHash = imageHash.replace("ipfs://", "");

  const imageUrl = imageHash
    ? `${ipfsBaseUrl}${formattedImageHash}`
    : "https://source.unsplash.com/random";
  return (
    <div className="card my-2" style={{ height: "330px", width: "450px" }}>
      <img
        className="h-42 object-cover w-full"
        src={imageUrl || "https://source.unsplash.com/random"}
        alt="green iguana"
      />
      <div className="p-4">
        <p className="text-gray-500">{title}</p>
        <div className="flex px-0">
          <button className="text-sm border border-[#0ECB81] rounded px-2 py-1 mr-2">
            Yes {"Yes " + BigNumber(totalYes ?? 0)?.dividedBy(10 ** 18)}
          </button>
          <button className="text-sm border border-[#DC4155] rounded px-2 py-1">
            {"No " + BigNumber(totalNo ?? 0)?.dividedBy(10 ** 18)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarousalCard;
