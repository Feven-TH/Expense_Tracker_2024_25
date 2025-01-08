
import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

// Create Expense DTO (For creating a new expense)
export class CreateExpenseDto {
    @IsString()
    description: string;
  
    @IsNumber()
    amount: number;
  
    createdAt?: string; 
  
    updatedAt?: string; 
  }
export class UpdateExpenseDto {
  @IsOptional()  
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;
  
  updatedAt: string;
}
