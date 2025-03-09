import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { TokenService } from './token.service';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getUsers(){
    const token = this.tokenService.getToken();
    return this.http.get<User[]>(`${this.apiUrl}/api/v1/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
