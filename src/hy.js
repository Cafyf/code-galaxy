const express = require("express");
const cors = require('cors');
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ hello: "world!" });
});

app.post("/run", async (req, res) => {
  const { language = "java", code , mode } = req.body;

  if (code !== null && code.length==0) {  // this is optional if you want remove this do that. and pass empty code from UI
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  try {   // hey nandhini do this also search how to delete files automatically in folder. 
    const filepath = await generateFile(language, code , mode);
    console.log("tracing mode is : "+mode);
    const output = await executeCpp(filepath,mode);
    return res.json({ filepath, output });
  } catch (error) {
    return res.status(500).json({error});
  }
});

app.listen(5000, () => {
  console.log("Listening port 5000");
});

