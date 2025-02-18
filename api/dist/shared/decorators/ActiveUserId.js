"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveUserId = void 0;
const common_1 = require("@nestjs/common");
exports.ActiveUserId = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    const userId = request.userId;
    if (!userId) {
        throw new common_1.UnauthorizedException();
    }
    return userId;
});
//# sourceMappingURL=ActiveUserId.js.map