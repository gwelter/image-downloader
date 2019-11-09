import express from "express";
import path from "path";
import cors from "cors";
import { downloadFile } from "./services/downloader";
import { zip } from "./services/compresser";

const PORT = 3333;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", async function(req, res) {
  const { images } = req.body;
  if (!images || !images.length)
    return res.status(400).json({ message: "No image url was provided" });

  const downloadPromises = images.map((url, index) =>
    downloadFile(url, `photo_${index}`)
  );

  Promise.allSettled(downloadPromises).then(all => {
    const filesPath = all
      .filter(({ value }) => !!value)
      .map(result => result.value);

    zip(filesPath)
      .then(filename => {
        res.json({
          filesPath,
          downloadFile: `http://localhost:${PORT}/files/${filename}`
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
});

app.use("/files", express.static(path.resolve(__dirname, "..", "files")));

app.listen(PORT, () => console.log(`Runnig on ${PORT}`));
