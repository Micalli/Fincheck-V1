import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsHexColor,
} from 'class-validator';
import { BankAccountType } from '../entities/BankAccount';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type: BankAccountType;

  @IsNotEmpty()
  @IsString()
  @IsHexColor()
  color: string;
}
