import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DataSourceUser } from './data-source';
import { UsersService } from '@services/users.service';
import { CdkTableModule } from '@angular/cdk/table';
import { User } from '@models/user';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-users',
  imports: [CdkTableModule],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit{
  private usersService = inject(UsersService);
  private authService = inject(AuthService);

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user: User | null = null;

  ngOnInit(): void {
    this.usersService.getUsers()
    .subscribe(users => {
      this.dataSource.init(users);
    })
    this.authService.user$
    .subscribe(user => {
      this.user = user;
    })
  }
}
