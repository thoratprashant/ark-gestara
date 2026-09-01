import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ia-signup',
  imports: [ReactiveFormsModule, MatButton, MatIconButton, MatFormFieldModule, MatInputModule],
  templateUrl: './ia-signup.html',
  styleUrl: './ia-signup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IaSignup {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  protected readonly passwordVisibility = signal({
    password: false,
    confirm: false,
  });

  protected readonly signupForm = this.formBuilder.nonNullable.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: [this.passwordsMatch] },
  );

  protected togglePasswordVisibility(field: 'password' | 'confirm'): void {
    this.passwordVisibility.update((visibility) => ({
      ...visibility,
      [field]: !visibility[field],
    }));
  }

  protected submit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    void this.router.navigate(['/admin/dashboard']);
  }

  private passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
