const { exec , spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const CheckWithDefaultResults = (filepath)=>{
  return new Promise((resolve, reject) => {
    exec(`java ${filepath}`, (error, stdout, stderr) => {
      error && reject({ error, stderr });
      stderr && reject(stderr);
      resolve(stdout.split("\r\n"));
    });
   });
};

const executeCpp =  (filepath,enabledTraceMood,userIp) => {
  console.log(userIp);
  if(userIp==='' && !enabledTraceMood){
    console.log("INFO : RUN WITH DEFAULT TEST INPUTS");
 CheckWithDefaultResults(filepath);
  }

  if(!enabledTraceMood){
  console.log('INFO: DISABLED TRACE MOOD');
  return  new Promise((resolve,reject) =>{ 
   const javaProcess = spawnSync('java', [filepath], {
      stdio: ['pipe', 'pipe', 'pipe'],
      input: fs.readFileSync("D:/CODING-BAT-UPGRADATION/src/codes"+'/input.txt'),
      encoding: 'utf-8'
    });
    javaProcess.stderr && reject({error:javaProcess.error,stderr:javaProcess.stderr});

    resolve(javaProcess.stdout);
  });
} 
else{
console.log("INFO: ENABLEDTRACEMOOD");
  return new Promise((resolve, reject) => {
    exec(`java ${filepath}`, (error, stdout, stderr) => {
      error && reject({ error, stderr });
      stderr && reject(stderr);
      resolve(stdout);
    });
   });}
};

module.exports = {
  executeCpp,
};
