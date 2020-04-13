const execSync = require("child_process").execSync;

execSync(
  'D:/AesDecryptServer/CryptAesPdf.exe --Mode CryptClient --LogFile D:/AesDecryptServer/20200407.log --SrcFile D:/AesDecryptServer/a1.enc --DstFile D:/AesDecryptServer/a1.enc.pdf --Password "1234567890asdfghjklqwertyuiopzxc" --JobType FileDecrypt',
  { encoding: "utf-8" }
); // the default is 'buffer'

console.log("end\n");
