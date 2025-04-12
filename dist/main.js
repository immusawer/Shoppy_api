"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const serverless_express_1 = require("@vendia/serverless-express");
let server;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    const uploadPath = (0, path_1.join)(__dirname, '..', 'uploads');
    app.useStaticAssets(uploadPath, {
        prefix: '/uploads/',
    });
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    server = (0, serverless_express_1.default)({ app: expressApp });
}
bootstrap();
const handler = (event, context, callback) => {
    return server(event, context, callback);
};
exports.handler = handler;
//# sourceMappingURL=main.js.map