import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faInfoCircle, faXmark} from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [BtnComponent, OverlayModule, FontAwesomeModule, RouterModule],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faXmark = faXmark;

  isOpen = false;
  isOpenBody = false;
}
