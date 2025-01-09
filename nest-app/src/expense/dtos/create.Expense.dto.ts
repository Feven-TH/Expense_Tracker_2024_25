import { IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateExpenseDto {
    @IsString()
    description: string;
    @IsNumber()
    amount: bigint;
    @IsOptional()
    createdAt?: string;  
  }

