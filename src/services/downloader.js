import axios from "axios";
import fs from "fs";
import path from "path";

export async function downloadFile(url, filename) {
  const fileExtension = url.match(/\.(png|jpg|jpeg|gif)/g) || ".png";
  const file = path.resolve(
    __dirname,
    "..",
    "..",
    "files",
    `${filename}${fileExtension}`
  );

  const response = await axios.get(url, {
    responseType: "stream"
  });

  response.data.pipe(fs.createWriteStream(file));
  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      resolve(`${filename}${fileExtension}`);
    });

    response.data.on("error", error => {
      reject(error);
    });
  });
}
