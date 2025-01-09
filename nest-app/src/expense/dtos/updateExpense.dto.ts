import { IsString, IsNumber, IsOptional } from 'class-validator';
export class UpdateExpenseDto {
    @IsOptional()  
    @IsString()
    description?: string;
    @IsOptional()
    @IsNumber()
    amount?: bigint;
    updatedAt: string;
  }