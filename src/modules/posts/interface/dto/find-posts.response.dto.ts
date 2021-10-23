import { ApiProperty } from '@nestjs/swagger';
import { FindPostsResult, ItemInFindPostsResult } from '../../application/queries/find-posts.result';

class FindPostsItem extends ItemInFindPostsResult {
  @ApiProperty({ format: 'uuid' })
  readonly id: string;

  @ApiProperty({ example: 'young' })
  readonly name: string;

  @ApiProperty({ example: 'son' })
  readonly description: string;
}

export class FindPostsResponseDTO {
  @ApiProperty({ type: [FindPostsItem] })
  readonly posts: FindPostsResult;
}
