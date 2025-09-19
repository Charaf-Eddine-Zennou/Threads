import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  imports: [],
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.scss'
})
export class CommentForm {
  @Input() placeholder = 'write something ...';
  @Input() buttonText = 'Create'; 
  @Output() formSubmitted = new EventEmitter<{
    text: string;
  }>();



  formSubmit($event: SubmitEvent) {
    $event.preventDefault(); 

    const form = $event.target as HTMLFormElement; 
    const textAreaElement= form.elements.namedItem('commentText')as HTMLTextAreaElement;
    const commentText = textAreaElement.value;
    form.reset();
    console.log({commentText});
    this.formSubmitted.emit({
      text: commentText,
    })
    console.log('Emitted comment text:', commentText);
  }
}
