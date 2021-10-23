import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePostBodyDTO {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @ApiProperty({ minLength: 5, maxLength: 50, example: 'Quien sera el nuevo presidente?' })
  readonly name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(250)
  @ApiProperty({ minLength: 10, maxLength: 250, example: 'Aun no se decide' })
  readonly description: string;
}
