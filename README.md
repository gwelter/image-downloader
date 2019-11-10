# image-downloader
Simple application that downloads a list of images e compress them into a zip file

# npm install
# npm run dev

The application will run on port 3333

POST -> /download with a array of image links, i.e.
{
  images: ["https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"]
}

# Next steps
- Make the download async, open a socket connection and let the server notify the client when the images are done downloading and compressing
(responde with the zip file link for download)
- Verify the real image extension before saving for compression (some image urls may end with .jpg, .png but are actually another format)
- Delete the files after download (or save the source link to skip later download request of an already image downloaded)
- Use typescript
