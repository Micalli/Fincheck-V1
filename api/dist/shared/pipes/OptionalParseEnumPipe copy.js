"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalParseEnumPipe = void 0;
const common_1 = require("@nestjs/common");
class OptionalParseEnumPipe extends common_1.ParseEnumPipe {
    transform(value, metadata) {
        if (typeof value === 'undefined') {
            return undefined;
        }
        return super.transform(value, metadata);
    }
}
exports.OptionalParseEnumPipe = OptionalParseEnumPipe;
//# sourceMappingURL=OptionalParseEnumPipe%20copy.js.map