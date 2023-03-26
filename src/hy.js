const express = require("express");

const app=express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res)=>{
    return res.json({hello:"world!"});
});

app.post("/run",  (req, res) => {
    const {language ="java", code }= req.body;
    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body!" });
      }
   return res.json({language, code});
});

app.listen(5000, ()=>{
    console.log("Listening port 5000");
});