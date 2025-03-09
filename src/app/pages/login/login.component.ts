import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnComponent } from '../../components/btn/btn.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [BtnComponent, RouterModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

}
