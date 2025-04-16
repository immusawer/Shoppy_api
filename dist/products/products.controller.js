"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../config/multer.config");
const image_service_1 = require("./image.service");
const fs = require("fs");
const user_decorator_1 = require("../auth/decorators/user.decorator");
let ProductsController = class ProductsController {
    productsService;
    imageService;
    constructor(productsService, imageService) {
        this.productsService = productsService;
        this.imageService = imageService;
    }
    async createProduct(userId, request, createProductDto, file) {
        console.log("User ID:", userId);
        if (!userId) {
            throw new common_1.UnauthorizedException('User ID is missing from JWT');
        }
        console.log("Extracted userId from JWT:", userId);
        if (file) {
            const originalImagePath = `./uploads/${file.filename}`;
            const compressedImagePath = `./uploads/compressed-${file.filename}`;
            if (!fs.existsSync(originalImagePath)) {
                throw new Error(`Image file not found: ${originalImagePath}`);
            }
            await this.imageService.compressImage(originalImagePath, compressedImagePath);
            fs.unlinkSync(originalImagePath);
            createProductDto.imageUrl = `/uploads/compressed-${file.filename}`;
        }
        return this.productsService.create(userId, createProductDto);
    }
    async getAllProducts() {
        return this.productsService.getAllProducts();
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multer_config_1.multerConfig)),
    __param(0, (0, user_decorator_1.User)('sub')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAllProducts", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        image_service_1.ImageService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map