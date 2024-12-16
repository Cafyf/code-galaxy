
const ArgsExtracter =(inputMethod ,type)=>{
    const regex = /(\w+(?:\s*\[\s*\])?)\s+(\w+)\s*\((.*?)\)/;
    const match = inputMethod.match(regex);
    if(type=="methodName") return match[2];
    const parametersString = match[3];
    let dataTypesInOrder=[];
    let variableNamesInOrder=[];
    const parameterRegex = /(\w+(?:\[\s*\]|\s?\[\s*\])*)\s*(\w+)/g;
    const methodArgs = []; 
    let parameterMatch;
    while ((parameterMatch = parameterRegex.exec(parametersString)) !== null) {
      dataTypesInOrder.push(parameterMatch[1]);
      variableNamesInOrder.push(parameterMatch[2]);
      methodArgs.push({ type: parameterMatch[1], name: parameterMatch[2] });
    }
  if (type === "dataTypes") {
    return dataTypesInOrder;
  } else if (type === "variableNames") {
    return variableNamesInOrder;
  }
    return methodArgs;
   // console.log(methodArgs[0].type,methodArgs[0].name);
};

// Output: [ { type: 'int', name: 'a' }, { type: 'String', name: 'name' }, { type: 'boolean', name: 'show' } ]

module.exports={
  ArgsExtracter
}
  