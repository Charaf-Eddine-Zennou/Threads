import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { CommentForm } from '../comment-form/comment-form';
import { commentInterface } from '../../interfaces/commentInterface.interface';
import { CommentService } from '../../services/comment/comment';
import { User } from '../../services/user/user';

@Component({
  selector: 'app-comment',
  imports: [CommonModule, CommentForm],
  templateUrl: './comment.html',
  styleUrl: './comment.scss',
})
export class CommentCommponent {
  @Input() comment!: commentInterface;
  isExpended = signal(false);
  isReplying = signal(false);
  nestedComments = signal<commentInterface[]>([]);
  commentService = inject(CommentService);
  comments = signal<commentInterface[]>([]);
  userService = inject(User)



  toggleExpanded() {
    const newValue = !this.isExpended();
    this.isExpended.set(newValue);

    if (newValue) {
      this.commentService.getComments(this.comment._id)
        .subscribe(comments => this.nestedComments.set(comments));
    }
  }

  toggleReplying() {
    const newValue = !this.isReplying();
    this.isReplying.set(newValue);

    if (newValue) {
      if (!this.isExpended()) {
        this.toggleExpanded();
      }
    }
  }


  createComment(formValues: {text: string}) {
    const { text } = formValues;
    const user = this.userService.getUserToStorage();
     
    if (!user) {
      return;
    }
    this.commentService.createComment({
      text, 
      userId: user._id,
      parentId: this.comment._id,
    })
    .subscribe((createdComment) => {
      this.comments.set([createdComment, ...this.comments()]);
    });

  }
}
