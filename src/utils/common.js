import Compressor from "compressorjs";

// The quality option in the Compressor class of the compressorjs library
// specifies the compression quality, where 0 is the lowest quality and 1 is the highest.
export async function compressImage(file, quality) {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: quality,
      success(result) {
        resolve(result);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

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
