import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '@models/user';
import { environment } from 'src/environments/environment.development';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  apiUrl = environment.API_URL;

  getUsers() {
    const token = this.tokenService.getToken();
    return this.http.get<User[]>(`${this.apiUrl}/api/v1/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
