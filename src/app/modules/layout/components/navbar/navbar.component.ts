import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faInfoCircle, faXmark} from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { BtnComponent } from '@modules/shared/components/btn/btn.component';
import { TokenService } from '@services/token.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BtnComponent, OverlayModule, FontAwesomeModule, RouterModule],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private tokenService = inject(TokenService);
  private router = inject(Router);
  private authService = inject(AuthService);

  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faXmark = faXmark;

  isOpen = false;
  isOpenBody = false;

  user$ = this.authService.user$;

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isValidToken() {
    console.log(this.tokenService.isValidToken());
  }
}
