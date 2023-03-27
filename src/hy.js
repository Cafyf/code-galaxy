import { generateFile } from "./generateFile";
const express = require("express");
const  generateFiles  = require(generateFile);

const app=express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res)=>{
    
    return res.json({hello:"world!"});
});

app.post("/run", async (req, res) => {
    const {language ="java", code }= req.body;
    

    if (code === undefined) {

        return res.status(400).json({ success: false, error: "Empty code body!" });
      }
      const filepath = await generateFile(language, code);

   return res.json({filepath});
});

app.listen(5000, ()=>{
    console.log("Listening port 5000");
});