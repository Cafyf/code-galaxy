function generateScannerCode(input) {
    let code = "";
    let pattern = /public\s+static\s+void\s+(\w+)\s*\((.*?)\)\s*\{/;
    let match = pattern.exec(input);
  
    if (match) {
      let methodName = match[1];
      let args = match[2].split(",");
  
      code += "Scanner sc = new Scanner(System.in);\n";
  
      for (let i = 0; i < args.length; i++) {
        let argParts = args[i].trim().split(/\s+/);
        let argType = argParts[0];
        let argName = argParts[1].replace(",", "");
        code += `${argType} ${argName} = `;
  
        if (argType === "int") {
          code += `Integer.parseInt(sc.nextLine());\n`;
        } else if (argType === "double") {
          code += `Double.parseDouble(sc.nextLine());\n`;
        } else if (argType === "float") {
          code += `Float.parseFloat(sc.nextLine());\n`;
        } else if (argType === "boolean") {
          code += `Boolean.parseBoolean(sc.nextLine());\n`;
        } else if (argType === "String") {
          code += `sc.nextLine();\n`;
        }
      }
  
      code += `System.out.println(${methodName}(`;
  
      for (let i = 0; i < args.length; i++) {
        let argName = args[i].trim().split(/\s+/)[1].replace(",", "");
        code += `${argName}`;
  
        if (i < args.length - 1) {
          code += ", ";
        }
      }
  
      code += "));";
    }
  
    return code;
  }
  
  let input = "public static void test(int a, String name, boolean show){ sjnjn};";
  console.log(generateScannerCode(input));
  