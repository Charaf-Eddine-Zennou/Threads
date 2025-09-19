import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment';
import { UserInterface } from '../../interfaces/userInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class User {
  http = inject(HttpClient);
  localStorageKey = 'threads_user';

  createUser(name: string) {
    return this.http.post<UserInterface>(`${environment.apiBaseUrl}/users`, { name });
  }

  saveUserToStorage(user: UserInterface) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  getUserToStorage(): UserInterface | null {
    const user = localStorage.getItem(this.localStorageKey);
    return user ? JSON.parse(user) as UserInterface : null;
  }
}
