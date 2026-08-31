import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-admin-profile',
  imports: [ReactiveFormsModule, MatButton, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class AdminProfile {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly isEditing = signal(false);
  protected readonly systemRoles = ['Administrator', 'Institution Admin', 'Clinical Admin'];

  protected readonly profileForm = this.formBuilder.nonNullable.group({
    fullName: ['Dr. Admin', Validators.required],
    email: ['admin@gestara.com', [Validators.required, Validators.email]],
    phoneNumber: ['+1 (555) 019-2834', Validators.required],
    department: ['Platform Administration', Validators.required],
    systemRole: ['Administrator', Validators.required],
  });

  constructor() {
    this.profileForm.disable();
  }

  protected handleProfileAction(): void {
    if (!this.isEditing()) {
      this.profileForm.enable();
      this.isEditing.set(true);
      return;
    }

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.profileForm.disable();
    this.isEditing.set(false);
  }
}
