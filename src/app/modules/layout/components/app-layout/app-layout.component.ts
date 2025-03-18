import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-app-layout',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './app-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutComponent implements OnInit{
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.getProfile()
    .subscribe(() => {
      // console.log('get profile');
    });
  }
}
