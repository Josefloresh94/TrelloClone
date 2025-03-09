import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RequestStatus } from '@models/request-status';
import { AuthService } from '@services/auth.service';
import { BtnComponent } from "../../../shared/components/btn/btn.component";

@Component({
  selector: 'app-forgot-password-form',
  imports: [ReactiveFormsModule, BtnComponent],
  templateUrl: './forgot-password-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordFormComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  status: RequestStatus = 'init';
  emailSent = false;
  errorMessage = '';

  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      this.errorMessage = '';
      const { email } = this.form.getRawValue();

      this.authService.recovery(email)
        .subscribe({
          next: () => {
            this.status = 'success';
            this.emailSent = true;
          },
          error: (error) => {
            this.status = 'failed';
            this.errorMessage = error?.message || 'An error occurred while trying to send the recovery email.';
          }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get isLoading(): boolean {
    return this.status === 'loading';
  }

  get isEmailField() {
    return this.form.get('email');
  }

  get emailFieldInvalid() {
    return this.isEmailField?.invalid && this.isEmailField?.touched;
  }
}
