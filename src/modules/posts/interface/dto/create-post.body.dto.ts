import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostBodyDTO {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @ApiProperty({ minLength: 5, maxLength: 50, example: 'Que opinan de la torre eiffel' })
  readonly name: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(250)
  @ApiProperty({ minLength: 10, maxLength: 255, example: 'La torre Eiffel inicialmente llamada tour' })
  readonly description: string;
}
