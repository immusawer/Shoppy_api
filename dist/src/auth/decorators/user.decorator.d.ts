import { JwtPayload } from '../jwt-payload.type';
export declare const User: <K extends keyof JwtPayload>(...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | K | undefined)[]) => ParameterDecorator;
