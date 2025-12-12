const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;

// للسماح برفع البيانات JSON من لوحة التحكم
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// مجلد الملفات الثابتة
app.use(express.static(path.join(__dirname, "public")));

// قراءة بيانات الأماكن
app.get("/api/places", (req, res) => {
    const dataPath = path.join(__dirname, "data", "places.json");
    if (!fs.existsSync(dataPath)) return res.json([]);

    const data = fs.readFileSync(dataPath, "utf8");
    res.json(JSON.parse(data));
});

// حفظ بيانات الأماكن
app.post("/api/places", (req, res) => {
    const dataPath = path.join(__dirname, "data", "places.json");
    fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
    res.json({ message: "Saved successfully" });
});

// إعادة توجيه أي رابط إلى index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// تشغيل الخادم
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server on " + port));

});
