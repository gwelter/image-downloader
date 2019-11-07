import express from "express";
import cors from "cors";
import { downloadFile } from "./services/downloader";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", async function(req, res) {
  const { images } = req.body;
  if (!images)
    return res.status(400).json({ message: "No image url was provided" });

  const downloadPromises = images.map((url, index) =>
    downloadFile(url, `photo_${index}`)
  );

  Promise.allSettled(downloadPromises).then(all => {
    console.log(all);
    res.end();
  });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Runnig on ${PORT}`));
