"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const serverless_express_1 = require("@vendia/serverless-express");
let server;
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
        origin: 'http://localhost:3000',
        credentials: true,
    });
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    server = (0, serverless_express_1.default)({ app: expressApp });
}
bootstrap();
const handler = async (event, context) => {
    return server(event, context);
};
exports.handler = handler;
//# sourceMappingURL=main.js.map