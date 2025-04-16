"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const sharp = require("sharp");
const common_1 = require("@nestjs/common");
let ImageService = class ImageService {
    async compressImage(inputPath, outputPath) {
        const { format } = await sharp(inputPath).metadata();
        if (format === 'jpeg' || format === 'jpg') {
            await sharp(inputPath)
                .resize(800)
                .jpeg({ quality: 80 })
                .toFile(outputPath);
        }
        else if (format === 'png') {
            await sharp(inputPath)
                .resize(800)
                .png({ quality: 80, compressionLevel: 9 })
                .toFile(outputPath);
        }
        else {
            throw new Error('Unsupported image format');
        }
    }
};
exports.ImageService = ImageService;
exports.ImageService = ImageService = __decorate([
    (0, common_1.Injectable)()
], ImageService);
//# sourceMappingURL=image.service.js.map