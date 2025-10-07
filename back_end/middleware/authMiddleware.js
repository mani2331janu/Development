const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

const allowedExtensions = {
    excel: [".xls", ".xlsx"],
    image: [".jpg", ".jpeg", ".png"],
};

const importHandler = (type, moduleName) => {
    console.log(1);
    
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const folder = path.join("uploads", moduleName);
            if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
            cb(null, folder);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    });

    const upload = multer({ storage });

    return [
        upload.single("file"),

        (req, res, next) => {
            if (!req.file) return res.status(400).json({ message: "No file uploaded" });

            const ext = path.extname(req.file.originalname).toLowerCase();

            if (type === "excel" && !allowedExtensions.excel.includes(ext)) {
                return res.status(400).json({ message: "Only Excel files (.xlsx, .xls) are allowed" });
            }
            if (type === "image" && !allowedExtensions.image.includes(ext)) {
                return res.status(400).json({ message: "Only image files (.jpg, .jpeg, .png) are allowed" });
            }

            try {
                if (type === "excel") {
                    const workbook = XLSX.readFile(req.file.path);
                    const sheetName = workbook.SheetNames[0];
                    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

                    req.importMeta = { type, moduleName };
                    req.importedData = data;

                    fs.unlinkSync(req.file.path);

                } else if (type === "image") {
                    req.importMeta = { type, moduleName };
                    req.importedFile = req.file;
                }

                next(); 
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "File processing error" });
            }
        },
    ];
};

module.exports = {
    authMiddleware,
    importHandler
};









