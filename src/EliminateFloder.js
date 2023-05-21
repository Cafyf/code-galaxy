const fs = require('fs');
const path = require("path");

const deleteFolder = (folderPath) => {
  let paths=  path.join(__dirname, folderPath);
//   const files = fs.readdirSync(folderPath);
//   const fileCount = files.length;  this the logic to get number of files in the folder if above 5 files delete it
  if (fs.existsSync(paths)) {
    fs.readdirSync(paths).forEach((file) => {
      const filePath = `${paths}/${file}`;

      if (fs.lstatSync(filePath).isDirectory()) {
        // Recursively delete sub-folders
        deleteFolder(filePath);
      } else {
        // Delete files
        fs.unlinkSync(filePath);
      }
    });

    // Delete the empty folder
    console.log(`Folder "${paths}" deleted successfully.`);
   // fs.unlinkSync(filePath);
   // fs.rmdirSync(paths);  use to remove dir
    return `Folder "${paths}" deleted successfully.`
  } else {
    console.log(`Folder "${paths}" does not exist.`);
    return `Folder "${paths}" does not exist.`;
  }
}

module.exports = {
    deleteFolder
  };
  
