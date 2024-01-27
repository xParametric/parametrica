import BigNumber from "bignumber.js";

export interface MarketProps {
  id: string;
  title?: string;
  imageHash?: string;
  totalAmount?: BigNumber;
  totalYes?: BigNumber;
  totalNo?: BigNumber;
  userYes?: string;
  hasResolved?: boolean;
  userNo?: string;
  timestamp?: string;
  description?: string;
  endTimestamp?: string;
  resolverUrl?: string;
}
export interface QuestionsProps {
  id: string;
  title?: string;
  imageHash?: string;
  totalAmount?: string;
  totalYes?: string;
  totalNo?: string;
  hasResolved?: boolean;
  endTimestamp?: string;
}

// export interface MarketProps {
//     id: string;
//     title: string;
//     imageHash: string;
//     totalAmount: string;
//     totalYes: string;
//     totalNo: string;
//   }
