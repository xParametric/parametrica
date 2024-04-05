import BigNumber from "bignumber.js";

export interface MarketProps {
  id: any;
  title?: any;
  imageHash?: any;
  totalAmount?: BigNumber | string;
  totalYes?: BigNumber | string;
  totalNo?: BigNumber | string;
  userYes?: any;
  hasResolved?: boolean;
  userNo?: any;
  timestamp?: any;
  description?: any;
  endTimestamp?: any;
  resolverUrl?: any;
}
export interface QuestionsProps {
  id: any;
  title?: any;
  imageHash?: any;
  totalAmount?: any;
  totalYes?: any;
  totalNo?: any;
  hasResolved?: boolean;
  endTimestamp?: any;
}

// export interface MarketProps {
//     id: any;
//     title: any;
//     imageHash: any;
//     totalAmount: any;
//     totalYes: any;
//     totalNo: any;
//   }
