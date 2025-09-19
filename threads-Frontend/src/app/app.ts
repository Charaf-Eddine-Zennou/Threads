import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from './services/user/user';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('threads-app');

  userService = inject(User)
  constructor() {
    
    const user = this.userService.getUserToStorage();
    if (!user) {
      const randomNumber = Math.ceil(Math.random() * 3000 + 1000);
      const randomName = `user_${randomNumber}`;
      this.userService.createUser(randomName)
      .subscribe(user => {
        console.log('user created', user);
      })


    }

  }
}
