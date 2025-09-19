import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { commentInterface } from '../../interfaces/commentInterface.interface';


type CreateCommentDto = {
  parentId?: string | null;
  text: string;
  userId: string;

}
@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.html',
  styleUrl: './comment.scss'
})

@Injectable({
  providedIn: 'root' 
})

export class CommentService {
  http = inject(HttpClient);
  
  getComments(parentId: string ='') {
    let url = `${environment.apiBaseUrl}/comments`;
    if(parentId) {
      url += `?parentId=${parentId}`;
    }
    return this.http.get<commentInterface[]>(url);

  }

  createComment(comment: CreateCommentDto) {
    console.log('Calling POST /comments with:', comment);
    return this.http.post<commentInterface>(`${environment.apiBaseUrl}/comments`, comment)

  }

}
