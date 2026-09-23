import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-provider',
  imports: [ReactiveFormsModule, MatButton, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './add-provider.html',
  styleUrl: './add-provider.scss',
})
export class AddProvider {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  protected readonly credentials = ['MD', 'DO', 'NP', 'PA-C', 'RN'];
  protected readonly providerRoles = [
    'Physician',
    'Nurse Practitioner',
    'Physician Assistant',
    'Registered Nurse',
  ];
  protected readonly specialties = [
    'Cardiology',
    'Dermatology',
    'Internal Medicine',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Radiology',
  ];

  protected readonly providerForm = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    credentials: [''],
    email: ['', [Validators.required, Validators.email]],
    mobileNumber: [''],
    providerRole: ['', Validators.required],
    primarySpecialty: ['', Validators.required],
    licenseNumber: [''],
  });

  protected saveProvider(): void {
    if (this.providerForm.invalid) {
      this.providerForm.markAllAsTouched();
      return;
    }

    void this.router.navigate(['/institution-admin/dashboard']);
  }

  protected cancel(): void {
    void this.router.navigate(['/institution-admin/dashboard']);
  }
}
