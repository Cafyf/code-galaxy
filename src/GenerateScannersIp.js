const generateScannerCode = (input) => {
    // Extract method arguments
    const pattern = /(?:public\s+|private\s+)?(?:static\s+)?(?:final\s+)?\w+\((.*?)\)/;
    const match = input.match(pattern);
    if (match) {
      console.log('matched');
      const args = match[1].split(",");
      console.log(args, 'argumenst');
      let scannerCode = "";
      scannerCode+=`Scanner sc = new Scanner(System.in);\n`;
      for (let i = 0; i < args.length; i++) {
        const arg = args[i].trim();
        const argParts = arg.split(" ");
        const argType = argParts[0];
        const argName = argParts[1];
        scannerCode +=`\t\t${argType} ${argName} = `;
        if (argType === "int") {
          scannerCode += `Integer.parseInt(sc.nextLine());\n`;
        } else if (argType === "double") {
          scannerCode += `Double.parseDouble(sc.nextLine());\n`;
        } else if (argType === "boolean") {
          scannerCode += `Boolean.parseBoolean(sc.nextLine());\n`;
        } else {
          scannerCode += `sc.nextLine();\n`;
        }
      }
      return scannerCode;
    }
    return "";
  }
  
module.exports={
    generateScannerCode
}