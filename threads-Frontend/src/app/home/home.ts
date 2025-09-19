import { Component, inject, OnInit, signal } from '@angular/core';
import { CommentCommponent } from '../components/comment/comment'
import { CommentService } from '../services/comment/comment';
import { commentInterface } from '../interfaces/commentInterface.interface';
import { CommonModule } from '@angular/common';
import { CommentForm } from '../components/comment-form/comment-form';
import { User } from '../services/user/user';
import { catchError, EMPTY } from 'rxjs';


@Component({
  selector: 'app-home',
  imports: [CommentCommponent, CommentForm, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  commentService = inject(CommentService);
  comments = signal<commentInterface[]>([]);
  userService = inject(User)
  
  ngOnInit(): void { 
    console.log('Home component initialized');
console.log('Home component initialized');


    const randomId = Math.floor(Math.random() * 10000);
    const username = `user_${randomId}`;

    this.userService.createUser(username).subscribe({
      next: (newUser) => {
        console.log('Utilisateur créé:', newUser);
        this.userService.saveUserToStorage(newUser); 
      },
      error: (err) => console.error('Erreur création utilisateur:', err)
    });
  
    this.getComments();
   
  }

  getComments() {
    this.commentService.getComments()
    .subscribe((comments) => {
      this.comments.set(comments);
    })

  }

createComment(formValues: { text: string }) {

  console.log('createComment called with:', formValues);
  const { text } = formValues;
  const user = this.userService.getUserToStorage();
  console.log("userrrrrrrrrrrr: ",user);

  if (!user) return;

 this.commentService.createComment({
  text,
  userId: user._id,
}).pipe(
  catchError(err => {
    console.error('HTTP Error:', err);
    return EMPTY;
  })
).subscribe({
  next: (createdComment) => {
    console.log('Comment created:', createdComment);
    this.comments.set([createdComment, ...this.comments()]);
  }
});

}

}
