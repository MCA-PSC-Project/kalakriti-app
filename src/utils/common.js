// export function formatAMPM(date) {
//   var hours = date.getHours();
//   var minutes = date.getMinutes();
//   var ampm = hours >= 12 ? "pm" : "am";
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   minutes = minutes < 10 ? "0" + minutes : minutes;
//   var strTime = hours + ":" + minutes + " " + ampm;
//   return strTime;
// }

export function formatDateTime(date) {
  var options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  var dateTimestr = date.toLocaleString("en-US", options);
  return dateTimestr;
}

export function convertToDateTime(timestamp) {
  const unixTimestamp = new Date(timestamp).getTime();
  return new Date(unixTimestamp);
}
