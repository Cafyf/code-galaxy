const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { classEditor } = require("./ClassEditor");
const dirCodes = path.join(__dirname, "codes");


const generateFileForQuestions= async (JsonData,topicName)=>{
  const dirCodes1 = path.join(__dirname, "Questions");
  if (!fs.existsSync(path.join(dirCodes1))) {
    fs.mkdirSync(dirCodes1, { recursive: true });
  }
  const filename = `${topicName}.json`;
  const filepath = path.join(dirCodes1, filename);
  if (fs.existsSync(filepath)){
     return await require(filepath);
  }
await fs.writeFileSync(filepath, JsonData);
return await require(filepath);
}

const generateFile = async (format, content , mode,userIp ,defaultIp) => {
  if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
  }
     // require colors to print the logs with colors
     // file name must be Main with questionId + userId + topicName
  const jobId = "Main"; //uuid();

  if(userIp!=''){
  await fs.writeFileSync(path.join(dirCodes,'input.txt'), userIp.split(' ').join('\n'));
  console.log('INFO: ','input file added successfully');
  }
  console.log("after if from file ");
  const filename = `${jobId}.${format}`;
  const filepath = path.join(dirCodes, filename);
  if(!mode){
  await fs.writeFileSync(filepath, classEditor(filepath,content,defaultIp,userIp===''?true:false));
  }else{
  await fs.writeFileSync(filepath, content);
  }
  return filepath;
};

module.exports = {
  generateFile,
  generateFileForQuestions
};