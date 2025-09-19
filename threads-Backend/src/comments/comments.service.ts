import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { Types } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private CommentModel: Model<Comment>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    const createdComment = this.CommentModel.create({
      text: createCommentDto.text,
      parent: createCommentDto.parentId,
      user: createCommentDto.userId,
    });
    return createdComment.then((doc) => {
      return doc.populate(['user', 'parent']);
    });
  }

  findAll() {
    return this.CommentModel.find().populate(['user', 'parent']).exec();
  }

  getTopLevelComments() {
    return this.CommentModel.find({ parent: null })
      .populate(['user', 'parent'])
      .sort({ createdAt: -1 })
      .exec();
  }

  getCommentsByParentId(parentId: string) {
    return this.CommentModel.find({ parent: new Types.ObjectId(parentId) })
      .populate(['user', 'parent'])
      .sort({ createdAt: -1 })
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
