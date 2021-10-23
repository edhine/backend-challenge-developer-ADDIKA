import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateCommentBodyDTO {
  
  @IsUUID()
  @ApiProperty({
    description: 'el ID puede ser de un post o un comentario',
    required: false,
    format: 'uuid',
    example: 'cf02ab95-9383-4263-999c-cdf58121952e',
  })
  readonly id: string;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  @ApiProperty({ minLength: 8, maxLength: 255, example: 'La torre Eiffel inicialmente llamada tour' })
  readonly content: string;
  
}
