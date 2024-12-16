const fs = require('fs');
const { ExtractMethodDeclaration , extractActualDeclaration }=require('./ExtractMethodDec');
const { generateScannerCode } = require('./GenerateScannersIp');
const {ArgsExtracter} = require('./ArgsExtract');
const {ConsDefaultIpTest} = require('./ConsDefaultIpRunner');

// return error header class structural erros . show as GpT
const classEditor = (filePathExce,codeSnippet,defaultIp,defaultTest) =>{
  // validation part 
  if(/System\.out\.println\(|print\(/.test(codeSnippet)) return "error:PRINT_STATEMENTS_ARE_NOT_ALLOWED";
 
  let coreMethod="test(int a, String [ ] name, boolean[] show)";
  console.log(coreMethod);
  const methods = codeSnippet.trim().match(/(\w+(?:\s*\[\s*\])?)\s+(\w+)\s*\([^)]*\)\s*{[^}]*}/g);
  let coreCodeSnippet='';
  let count =0;
  console.log(methods);
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\s?\\$&').replace(" ","");
  }

  if(methods.length>1){
  try {for (const method of methods) {
    const methodName = ArgsExtracter(method.trim(),"methodName");
    const parameterTypes = ArgsExtracter(method.trim(),"dataTypes");
    console.log(parameterTypes,"parameterTypes");
    const escapedParameterTypes = parameterTypes.map(escapeRegEx=> escapeRegExp(escapeRegEx));
    console.log(escapedParameterTypes,"escapedParameterTypes");
    const regexString =`\\b${methodName}\\s*\\(\\s*(?:${escapedParameterTypes.join('\\s?\\w+\\s*,\\s*')})\\s+\\w+\\s*\\)`;
    const methodRegex = new RegExp(regexString);
    if (methodRegex.test(coreMethod) ) {
        coreCodeSnippet=method.trim();
        count++;
        console.log('The method declaration already exists in the file');
      } else {
        console.log('The method declaration does not exist in the file');
      } 
  }}
  catch(err){
    console.log(err.stack);
  }
  if(count===0){
    console.log("error:DONT_CHANGE_THE_DEFAULT_METHOD_DECLARATION");
    return "error:DONT_CHANGE_THE_DEFAULT_METHOD_DECLARATION";
  }
};

/*  End of Validation part */

// Read contents of the file
let filePath ='src/Main.java'
let fileContent = fs.readFileSync(filePath, 'utf-8');
let input ='';
let scanners='';
if(coreCodeSnippet!=''){
  input=ExtractMethodDeclaration(coreCodeSnippet);
  scanners=generateScannerCode(coreCodeSnippet);
}
else{
input = ExtractMethodDeclaration(codeSnippet);
scanners = generateScannerCode(codeSnippet);
}
if(defaultTest){ return ConsDefaultIpTest(fileContent,coreCodeSnippet!=''?coreCodeSnippet:codeSnippet,codeSnippet,defaultIp.defaultIp);}
//console.log(fileContent.slice(-3,-2)); i can get the last before curly braces to add more method and scanners
//console.log(scanners);
fileContent=fileContent.replace(/public static void main\(String\[\] args\)\s*\{\s*\}/, `public static void main(String[] args) {\n    ${scanners}\n \n   System.out.println(${input});\n}`);

// Find the position where the code snippet should be inserted
const insertionPosition = fileContent.indexOf('public static void main(String[] args) {');

// Construct the final content by inserting the code snippet
const finalContent = fileContent.slice(0, insertionPosition) + codeSnippet + '\r\t'+ fileContent.slice(insertionPosition);

// Write the final content back to the file
return finalContent;
//fs.writeFileSync(filePathExce, finalContent);
};
const codeSnippet2 = `
public static String test(int a, String name, boolean show) {
  return a + " " + name + " " + show +" "+test2(a);
}
public  void test(int a,String [] name,boolean []show) {
  return a + " " + name + " " + show +" "+test2(a);
}
`;
classEditor('',codeSnippet2,true);
module.exports={
  classEditor
}

