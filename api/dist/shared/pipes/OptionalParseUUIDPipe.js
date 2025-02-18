"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalParseUUIDPipe = void 0;
const common_1 = require("@nestjs/common");
class OptionalParseUUIDPipe extends common_1.ParseUUIDPipe {
    transform(value, metadata) {
        if (typeof value === 'undefined') {
            return undefined;
        }
        return super.transform(value, metadata);
    }
}
exports.OptionalParseUUIDPipe = OptionalParseUUIDPipe;
//# sourceMappingURL=OptionalParseUUIDPipe.js.map