import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ForgotPasswordFormComponent } from "../../components/forgot-password-form/forgot-password-form.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ForgotPasswordFormComponent, RouterModule],
  templateUrl: './forgot-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {

}
