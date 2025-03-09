import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundComponent } from '@modules/auth/components/background/background.component';
import { FooterComponent } from '@modules/auth/components/footer/footer.component';
import { HeaderComponent } from '@modules/auth/components/header/header.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, BackgroundComponent],
  templateUrl: './auth-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLayoutComponent {

}
