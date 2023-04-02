// const input = "public static int test(String name , int age,boolean a) { return age; }";
// const pattern = /public\s+(static\s+)?([\w$<>?,.\s]+)\s+(\w+)\s*\((.*?)\)/;
// const match = input.replace(/,/g, ", ").match(pattern);
// if (match) {
//   const returnType = match[2].trim();
//   const methodName = match[3].trim();
//   const argsString = match[4].trim();
//   const args = argsString.split(/,\s+/).map((argString) => {
//     const [type, name] = argString.trim().split(/\s+/);
//     return { type, name };
//   });
//   const argList = args.map((arg) => arg.name).join(', ');
//   console.log(`${methodName}(${argList}) and return type: ${returnType}`);
// }


//it will give output with test(String name, int age,boolean ok) and return type int
const input = "public static int test(String name, int age,boolean ok) { return age; ijsdij }";
const extractActualDeclaration =(input, returnBackElement)=>{
const pattern = /(?:public\s+|private\s+)?(?:static\s+)?(?:final\s+)?([\w$<>?,.\s]+)\s+(\w+)\s*\((.*?)\)/;
const match = input.match(pattern);

if (match) {
  const returnType = match[1].trim();
  const methodName = match[2].trim();
  const arguments = match[3].trim();
 // console.log(`${methodName}(${arguments}) and return type: ${returnType}`);
  if(returnBackElement==="returnType"){
    return returnType;
  } else if(returnBackElement==="methodName"){           // add one more if to return only method name and return and arguments
     return methodName;
  } else if(returnBackElement==="methodArgs"){
      return arguments;
  }
  return `${returnType} ${methodName}(${arguments})`; // if you want with return type add it ${returnType} in first
}
};
// ** output will be test(a,name,show,how);
// const input = "public static void test(int a, String name, boolean show,oolean how) {\n  if(show){\n        return ;\n   }\n    System.out.println(a + \" \" + name + \" \" + show);\n }";
const ExtractMethodDeclaration=(input)=>{
// Extract method name
const methodNameRegex = /(?:public\s+|private\s+)?(?:static\s+)?(?:final\s+)?(\w+)\s*\(/;
const match = input.match(methodNameRegex);
let methodName;
if (match && match.length >= 2) {
  methodName = match[1];
 // console.log(methodName);
} else {
  console.log("Method name not found");
}
 let output = `${methodName}(`;

// Extract method arguments
const argRegex = /\((.*?)\)/;
const argMatch = input.match(argRegex);
const args = argMatch[1].split(",");
for (let i = 0; i < args.length; i++) {
  const argParts = args[i].trim().split(/\s+/);
  const argType = argParts[0];
  const argName = argParts[1].replace(",", "");
  output += `${argName},`;
}
output = output.slice(0, -1); // remove trailing comma
output += `)`;
console.log(output);
return output;
 }

 module.exports = {
    ExtractMethodDeclaration,
    extractActualDeclaration
  };