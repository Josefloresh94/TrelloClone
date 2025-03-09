import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterFormComponent } from "../../components/register-form/register-form.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RegisterFormComponent, RouterLink],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

}
