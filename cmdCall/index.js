const express = require("express");
const child_process = require("child_process");
const fs = require("fs");

const app = express();
const PORT = 8096;

const EXE_PATH = "C:/apps/AesDecryptServer/CryptAesPdf.exe ";
const PDF_PATH = "D:";
const LOG_PATH = "C:/apps/AesDecryptServer/logs";
const PRO_PATH = "C:/apps/AesDecryptServer/proc";

const OPT_MOD = "--Mode CryptClient ";
const OPT_JOB = "--JobType FileDecrypt ";

const OPT_LOG = "--LogFile ";
const OPT_SRC = "--SrcFile ";
const OPT_DST = "--DstFile ";
const OPT_PRO = "--ProFile ";
const OPT_PSWD = '--Password "IUxXAJX73spE3+BxNzV94ieJnaSp9qT9DVExQGc6k6w=" ';

const makeCMD = (filePath, filename) => {
  const cmd =
    EXE_PATH +
    OPT_MOD +
    OPT_LOG +
    LOG_PATH +
    "/" +
    filename +
    ".log " +
    OPT_SRC +
    PDF_PATH +
    filePath +
    "/" +
    filename +
    ".enc " +
    OPT_DST +
    PDF_PATH +
    filePath +
    "/" +
    filename +
    ".pdf " +
    OPT_PRO +
    PRO_PATH +
    "/" +
    filename +
    " " +
    OPT_PSWD +
    OPT_JOB;
  return cmd;
};

function handleListening() {
  console.log(`Listening on: http://localhost:${PORT}`);
}

// .net Decryption Cmd Call
app.get("/desc", function(req, res) {
  try {
    const {
      query: { filepath, filename }
    } = req;

    //if (filepath == "favicon.ico") {
    //  res.sendStatus(200);
    //  return;
    //}

    const cmd = makeCMD(filepath, filename);
    console.log(cmd);
    child_process.exec(cmd, { encoding: "utf-8" }, function(
      error,
      stdout,
      stderr
    ) {
      let count = 0;

      const intervalId = setInterval(function() {
        console.log(new Date().toLocaleString());
        count++;

        // File Exist Check
        fs.access(PRO_PATH + "/" + filename + ".done", error => {
          if (!error) {
            // if exist
            console.log("file exist");
            clearInterval(intervalId);
            res.sendStatus(200);
          } else {
            // 10 times check
            if (count == 10) {
              clearInterval(intervalId);
              res.sendStatus(400);
            }
            console.log("file doesn't exist");
          }
        });
      }, 1000);
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

app.listen(PORT, handleListening);
