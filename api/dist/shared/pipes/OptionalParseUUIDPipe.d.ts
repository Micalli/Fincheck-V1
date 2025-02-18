import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common';
export declare class OptionalParseUUIDPipe extends ParseUUIDPipe {
    transform(value: string, metadata: ArgumentMetadata): Promise<string>;
}
