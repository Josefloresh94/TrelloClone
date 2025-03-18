import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '@models/user';
import { environment } from 'src/environments/environment.development';
import { TokenService } from './token.service';
import { withToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);

  apiUrl = environment.API_URL;

  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/api/v1/users`, {
      context: withToken()
    });
  }
}
