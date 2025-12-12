const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 8080;

// السماح بقراءة JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ملفات الواجهة
app.use(express.static(path.join(__dirname, "public")));

// قراءة البيانات
app.get("/api/places", (req, res) => {
    const dataPath = path.join(__dirname, "data", "places.json");

    if (!fs.existsSync(dataPath)) {
        return res.json([]);
    }

    const data = fs.readFileSync(dataPath, "utf8");
    res.json(JSON.parse(data));
});

// حفظ البيانات
app.post("/api/places", (req, res) => {
    const dataPath = path.join(__dirname, "data", "places.json");

    fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
    res.json({ message: "Saved successfully" });
});

// إعادة توجيه لأي رابط إلى index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});
