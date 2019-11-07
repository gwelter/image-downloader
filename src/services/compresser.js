import fs from "fs";
import path from "path";
import archiver from "archiver";

export function zip(files) {
  const file = path.resolve(__dirname, "..", "..", "files", `images.zip`);
  const output = fs.createWriteStream(file);

  const archive = archiver("zip", {
    zlib: { level: 9 }
  });

  archive.pipe(output);

  return new Promise((resolve, reject) => {
    output.on("end", function() {
      resolve();
    });

    archive.on("warning", function(err) {
      if (err.code === "ENOENT") {
        console.log("Warning");
      } else {
        reject(err);
      }
    });

    archive.on("error", function(err) {
      reject(err);
    });

    archive.on("finish", function() {
      resolve();
    });

    files.forEach(filename => {
      const filePath = path.resolve(
        __dirname,
        "..",
        "..",
        "files",
        `${filename}`
      );

      archive.file(filePath, { name: filename });
    });

    archive.finalize();
  });
}
