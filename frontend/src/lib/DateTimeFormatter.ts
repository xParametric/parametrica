import moment from "moment-timezone";

export const convertToLocalTime = (utcTime: any) => {
  const date = moment(utcTime, "x");
  if (!date.isValid()) {
    return "Invalid Date";
  }
  return date.local().format("YYYY-MM-DD HH:mm:ss");
};

export function convertMilliSecondsToLocalTime(timestamp: any) {
  const trimmedTimestamp = parseInt(timestamp.substring(0, 13));
  return moment(trimmedTimestamp).tz(moment.tz.guess()).format("HH:mm:ss");
}

export const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
