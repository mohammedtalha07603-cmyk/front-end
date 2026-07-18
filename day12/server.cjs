const express = require("express");
const cors = require("cors");
const multer = require("multer");
const XLSX = require("xlsx");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.any(), (req, res) => {
    console.log("Files:", req.files);
    console.log("Body:", req.body);

    res.json({
        files: req.files,
        body: req.body
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});