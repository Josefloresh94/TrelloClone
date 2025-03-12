import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RequestStatus } from '@models/request-status';
import { BtnComponent } from '@modules/shared/components/btn/btn.component';
import { AuthService } from '@services/auth.service';
import { CustomValidators } from '@utils/validators';

@Component({
  selector: 'app-register-form',
  imports: [BtnComponent, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
  private formBuilder= inject(FormBuilder);
  private router= inject(Router);
  private authService= inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  formUser = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.minLength(8), Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });

  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showConfirmPassword = false;
  showRegister = false;
  errorMessage = '';

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      this.authService.registerAndLogin(name, email, password)
        .subscribe({
          next: () => {
            this.status = 'success';
            this.router.navigate(['/home']);
          },
          error: (error) => {
            this.status = 'failed';
            this.errorMessage = error?.message || 'Invalid email or password';
            this.cdr.markForCheck();
            setTimeout(() => {
              this.cdr.markForCheck();
            }, 2000);
          }
        })
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateUser() {
    if (this.formUser.valid) {
      this.statusUser = 'loading';
      const { email } = this.formUser.getRawValue();
      this.authService.isAvailable(email)
      .subscribe({
        next: (rta) => {
          this.statusUser = 'success';
          if (rta.isAvailable) {
            this.showRegister = true;
            this.form.controls.email.setValue(email);
            this.cdr.markForCheck();
          } else {
            this.router.navigate(['/login'], {
              queryParams: { email }
            });
          }
        },
        error: (error) => {
          this.statusUser = 'failed';
          this.errorMessage = error?.message || 'Error checking email availability';
          this.cdr.markForCheck();
          setTimeout(() => {
            this.statusUser = 'init';
            this.cdr.markForCheck();
          }, 2000);
        }
      })
    } else {
      this.formUser.markAllAsTouched();
    }
  }
}
