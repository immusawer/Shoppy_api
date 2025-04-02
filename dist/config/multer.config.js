"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer = require("multer");
const path = require("path");
exports.multerConfig = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png'];
        if (!allowedMimes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type'), false);
        }
        cb(null, true);
    },
};
//# sourceMappingURL=multer.config.js.map