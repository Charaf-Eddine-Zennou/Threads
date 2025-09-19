/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll(@Query() queryParams) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (queryParams.parentId) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return this.commentsService.getCommentsByParentId(queryParams.parentId);
      } catch (e) {
        throw new BadRequestException('Something bad happened', {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          cause: new Error(e.message),
          description: 'Some error description',
        });
      }
    }
    return this.commentsService.getTopLevelComments();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
