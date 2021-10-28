import extract from "pdf-text-extract";
import http from "http"; // or 'https' for https:// URLs
import fs from "fs";
import path from "path";
import pdfx from "pdf.js-extract";
import axios from "axios";

const pdfUrl =
  "http://res.cloudinary.com/isetz/raw/upload/v1635282623/kyxpmcvisqf0i4tqgqyd";

const fileName = pdfUrl.slice(-20);
console.log(fileName);

const getFile = async () => {
  const fileRequest = await new Promise((resolve, reject) => {
    http.get(pdfUrl, function (response) {
      // console.log(response);
      // create the file where the output will be written
      console.log(fileName);
      var file = fs.createWriteStream("./" + fileName + ".pdf");
      response.pipe(file);
      file.on("finish", function () {
        file.close(); // close() is async, call cb after close completes.
        console.log("finish");
      });
    });
  });

  await fileRequest;
};

getFile().then(() => {
  console.log("done");
});

// extract text from a PDF file
console.log("extracting...");
var filePath = path.join(fileName + ".pdf");

setTimeout(() => {
  extract(
    path.parse("http://www.africau.edu/images/default/sample.pdf"),
    function (err, pages) {
      if (err) {
        console.dir(err);
        return;
      }
      console.dir(pages);
    }
  );
}, 1000);
