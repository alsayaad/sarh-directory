const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 8080;

// السماح بقراءة JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// التأكد أن مجلد data موجود
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// ضمان وجود ملف places.json
const dataPath = path.join(dataDir, "places.json");
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, "[]"); 
}

// ملفات الواجهة
app.use(express.static(path.join(__dirname, "public")));

// قراءة البيانات
app.get("/api/places", (req, res) => {
    try {
        const data = fs.readFileSync(dataPath, "utf8");
        res.json(JSON.parse(data));
    } catch (err) {
        res.json([]);
    }
});

// حفظ البيانات
app.post("/api/places", (req, res) => {
    fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
    res.json({ message: "Saved successf
