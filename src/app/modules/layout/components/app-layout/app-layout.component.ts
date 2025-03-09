import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-app-layout',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './app-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutComponent {

}
