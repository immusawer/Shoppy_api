// multer.config.ts
import * as multer from 'multer';
import * as path from 'path';

export const multerConfig = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // Path where files are stored
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Ensure unique file names
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
