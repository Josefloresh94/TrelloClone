import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DataSourceUser } from './data-source';
import { UsersService } from '@services/users.service';
import { CdkTableModule } from '@angular/cdk/table';

@Component({
  selector: 'app-users',
  imports: [CdkTableModule],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit{
  private usersService = inject(UsersService);

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];

  ngOnInit(): void {
    this.usersService.getUsers()
    .subscribe(users => {
      this.dataSource.init(users);
    })
  }
}
