import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

const matchingPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('newPassword')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return newPassword && confirmPassword && newPassword !== confirmPassword
    ? { passwordsDoNotMatch: true }
    : null;
};

@Component({
  selector: 'app-admin-profile',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatIconButton,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class AdminProfile {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly systemRoles = ['Administrator', 'Institution Admin', 'Clinical Admin'];
  protected readonly activeTabIndex = signal(0);
  protected readonly profileEditing = signal(false);
  protected readonly currentPasswordVisible = signal(false);
  protected readonly newPasswordVisible = signal(false);
  protected readonly confirmPasswordVisible = signal(false);

  protected readonly profileForm = this.formBuilder.nonNullable.group({
    firstName: ['John', Validators.required],
    lastName: ['Smith', Validators.required],
    email: ['admin@gestara.com', [Validators.required, Validators.email]],
    phoneNumber: ['+1 (555) 019-2834', Validators.required],
    department: ['Platform Administration', Validators.required],
    systemRole: ['Administrator', Validators.required],
  });

  private savedProfile = this.profileForm.getRawValue();

  protected readonly passwordForm = this.formBuilder.nonNullable.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: matchingPasswords },
  );

  constructor() {
    this.profileForm.disable({ emitEvent: false });
  }

  protected editProfile(): void {
    this.profileEditing.set(true);
    this.profileForm.enable({ emitEvent: false });
  }

  protected cancelProfileChanges(): void {
    this.profileForm.reset(this.savedProfile);
    this.profileForm.disable({ emitEvent: false });
    this.profileEditing.set(false);
  }

  protected saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.savedProfile = this.profileForm.getRawValue();
    this.profileForm.markAsPristine();
    this.profileForm.markAsUntouched();
    this.profileForm.disable({ emitEvent: false });
    this.profileEditing.set(false);
  }

  protected cancelPasswordChange(): void {
    this.passwordForm.reset();
    this.currentPasswordVisible.set(false);
    this.newPasswordVisible.set(false);
    this.confirmPasswordVisible.set(false);
  }

  protected savePassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.cancelPasswordChange();
  }
}
