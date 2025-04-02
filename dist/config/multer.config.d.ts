import * as multer from 'multer';
export declare const multerConfig: {
    storage: multer.StorageEngine;
    fileFilter: (req: any, file: any, cb: any) => any;
};
