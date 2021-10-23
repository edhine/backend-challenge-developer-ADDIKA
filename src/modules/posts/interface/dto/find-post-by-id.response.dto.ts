import { ApiProperty } from '@nestjs/swagger';
import { FindPostByIdResult } from '../../application/queries/find-post-by-id.result';

export class FindPostByIdResponseDTO extends FindPostByIdResult {
  @ApiProperty({ format: 'uuid' })
  readonly id: string;

  @ApiProperty({ example: 'young' })
  readonly name: string;

  @ApiProperty({ example: 'son' })
  readonly description: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  @ApiProperty({ nullable: true, required: false, example: null })
  readonly deletedAt: Date | null;
  
  
  @ApiProperty({ nullable: true, required: false, example: null })
  readonly comments: [] | null;
}
