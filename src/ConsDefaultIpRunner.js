const {ExtractMethodDeclaration }=require('./ExtractMethodDec');
const {ArgsExtracter} = require('./ArgsExtract');

const fixArgs=(args,varName,index)=>{
  if(args.includes('[]') || args.includes(' []')){
      let type=args.replace('[]','');
       let construct =`new ${type}${`[v[${index}].length]`};\n ${type} i${index}=0;\n`;
       construct +=`for(${type}v2:v[${index}]){\n ${varName}[i${index}] = v2;\n}`;
          return construct;
  }
 return `(${args}) v[${index}];`;
}

const ConsDefaultIpTest=(fileContent,input,codeSnippet,defaultIp)=>{
    let argsForLoop='';
    const argsTypes =ArgsExtracter(input);
    argsTypes.forEach((e,index)=>{argsForLoop+=`${e.type} ${e.name} = ${fixArgs(e.type,e.name,index)}\n`})

   // const InputDesc=['{2,"hih",true}','{3,"puu",false}','{4,"iij",false}'];
   let a=''
   defaultIp.forEach(element => {
            a+=`{${element}}` 
      });
 console.log(argsForLoop);
    a=a.split("}{").join(",");
  console.log(a);
const methodDeclaration=ExtractMethodDeclaration(input);
const forLoop =`\n Object [][] input = ${a};\n for(Object[] v: input) {\n ${argsForLoop} \nSystem.out.println(${methodDeclaration});\n}`
console.log(forLoop);
fileContent=fileContent.replace(/public static void main\(String\[\] args\)\s*\{\s*\}/, `\r\t\npublic static void main(String[] args) { \r\n ${forLoop}\n}`);

    // Find the position where the code snippet should be inserted
const insertionPosition = fileContent.indexOf('public static void main(String[] args) {');

// Construct the final content by inserting the code snippet
const finalContent = fileContent.slice(0, insertionPosition) + codeSnippet + '\r\n'+ fileContent.slice(insertionPosition);
//console.log(finalContent);
// Write the final content back to the file
return finalContent;
}

//ConsDefaultIpTest('','public static int test(int [] a, String[] name, boolean show){}','',{1,2,3});
module.exports={
    ConsDefaultIpTest
}