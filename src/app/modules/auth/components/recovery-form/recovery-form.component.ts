import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RequestStatus } from '@models/request-status';
import { BtnComponent } from '@modules/shared/components/btn/btn.component';
import { AuthService } from '@services/auth.service';
import { CustomValidators } from '@utils/validators';

@Component({
  selector: 'app-recovery-form',
  imports: [BtnComponent, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './recovery-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecoveryFormComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form = this.formBuilder.nonNullable.group(
    {
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('newPassword', 'confirmPassword'),
      ],
    }
  );

  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  token = '';

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      const token = params.get('token');
      if(token){
        this.token = token;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  recovery() {
    if (this.form.valid) {
      const { newPassword } = this.form.getRawValue();
      this.status = 'loading';
      this.authService.changePassword(this.token, newPassword)
        .subscribe({
          next: () => {
            this.status = 'success';
            this.router.navigate(['/login'])
          },
          error: () => {
            this.status = 'failed';
          }
        })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
