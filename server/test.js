import extract from "pdf-text-extract";
import http from "http"; // or 'https' for https:// URLs
import fs from "fs";
import path from "path";
import pdfx from "pdf.js-extract";

const request = http.get(
  "http://res.cloudinary.com/isetz/raw/upload/v1635282623/kyxpmcvisqf0i4tqgqyd",
  function (response) {
    // console.log(response);
    // create the file where the output will be written
    var file = fs.createWriteStream("./test.pdf");
    response.pipe(file);
    file.on("finish", function () {
      file.close(); // close() is async, call cb after close completes.
      console.log("done");
    });
  }
);

// extract text from a PDF file

var filePath = path.join("test.pdf");

extract(filePath, function (err, pages) {
  if (err) {
    console.dir(err);
    return;
  }
  console.dir(pages);
});
