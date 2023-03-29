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
  const { language = "java", code } = req.body;

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  try {   // hey nandhini do this also search how to delete files automatically in folder. 
    const filepath = await generateFile(language, code);
    const output = await executeCpp(filepath);
    return res.json({ filepath, output });
  } catch (error) {
  // const st=JSON.stringify(error).split("error:")[1];
    return res.status(500).json({error});
  }
});

app.listen(5000, () => {
  console.log("Listening port 5000");
});

