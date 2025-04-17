"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    const uploadPath = (0, path_1.join)(__dirname, '..', 'uploads');
    console.log('Static files path:', uploadPath);
    app.useStaticAssets(uploadPath, {
        prefix: '/uploads/',
    });
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT', 3000);
    app.enableCors({
        origin: ['http://localhost:3000', 'https://shoppy-ui-pi.vercel.app/', 'https://3d1e-217-142-22-215.ngrok-free.app '],
        credentials: true,
    });
    await app.listen(port);
    console.log(`Server started on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map