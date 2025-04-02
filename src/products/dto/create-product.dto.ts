import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsNumber()
  @IsPositive() // Ensure price is a positive number
  @Transform(({ value }) => parseFloat(value)) // Convert string to number
  price: number;

  @IsOptional() // Allow empty values
  @IsString()
  imageUrl?: string;

  @IsNumber()
  @IsInt() // Ensure it's an integer
  @Transform(({ value }) => parseInt(value, 10)) // Convert from string to integer
  categoryId: number;
}
