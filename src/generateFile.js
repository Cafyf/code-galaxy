const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { classEditor } = require("./ClassEditor");
const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content , mode) => {
     // require colors to print the logs with colors
     // file name must be Main with questionId + userId + topicName
  const jobId = "Main"; //uuid();
  await fs.writeFileSync(path.join(dirCodes,'input.txt'), '2\r\n"Nandhini is good"\r\ntrue\r\n"hey unnatha"\r\ntrue\r\n');
  console.log('INFO: ','input file added successfully');
  const filename = `${jobId}.${format}`;
  const filepath = path.join(dirCodes, filename);
  if(!mode){
  await fs.writeFileSync(filepath, classEditor(filepath,content));
  }else{
  await fs.writeFileSync(filepath, content);
  }
  return filepath;
};

module.exports = {
  generateFile,
};