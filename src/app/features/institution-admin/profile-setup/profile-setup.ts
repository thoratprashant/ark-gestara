import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { InstitutionAdminProfileState } from '../institution-admin-profile-state';

@Component({
  selector: 'app-profile-setup',
  imports: [ReactiveFormsModule, MatButton, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './profile-setup.html',
  styleUrl: './profile-setup.scss',
})
export class ProfileSetup {
  private readonly formBuilder = inject(FormBuilder);
  private readonly profileState = inject(InstitutionAdminProfileState);
  private readonly router = inject(Router);

  protected readonly countries = ['United States'];
  protected readonly profileCompleted = this.profileState.profileCompleted;
  protected readonly profileSetupHero = viewChild<ElementRef<HTMLElement>>('profileSetupHero');
  protected readonly profileSetupFormElement =
    viewChild<ElementRef<HTMLFormElement>>('profileSetupFormElement');

  protected readonly profileSetupForm = this.formBuilder.nonNullable.group({
    institutionName: [{ value: 'Gestara Healthcare', disabled: true }],
    legalBusinessName: [{ value: 'Gestara Healthcare, Inc.', disabled: true }],
    institutionType: [{ value: 'Hospital', disabled: true }],
    organizationNpi: [{ value: '1234567890', disabled: true }],
    organizationIdentifier: [{ value: 'GH-001', disabled: true }],
    website: ['https://gestara.com'],
    addressLine1: ['125 Main Street', Validators.required],
    addressLine2: ['Building A, Suite 200'],
    city: ['San Francisco', Validators.required],
    state: ['California', Validators.required],
    postalCode: ['94105', Validators.required],
    country: ['United States', Validators.required],
    contactFirstName: ['', Validators.required],
    contactLastName: ['', Validators.required],
    contactJobTitle: [''],
    contactEmail: ['', [Validators.required, Validators.email]],
    contactPhone: ['+1 512-555-0293', Validators.required],
    adminFirstName: [{ value: 'Sarah', disabled: true }],
    adminLastName: [{ value: 'Mitchell', disabled: true }],
    adminJobTitle: [{ value: 'Chief Operating Officer', disabled: true }],
    adminEmail: [{ value: 's.mitchell@greenfieldmed.org', disabled: true }],
    adminMobile: [{ value: '+1 512-555-0147', disabled: true }],
  });

  protected saveProfile(): void {
    if (this.profileSetupForm.invalid) {
      this.profileSetupForm.markAllAsTouched();
      this.scrollToFirstInvalidSection();
      return;
    }

    this.profileState.completeProfile();
    this.profileSetupForm.disable({ emitEvent: false });

    queueMicrotask(() => {
      this.profileSetupHero()?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  protected goToDashboard(): void {
    void this.router.navigate(['/institution-admin', 'dashboard']);
  }

  protected primaryContactHasError(): boolean {
    const controls = this.profileSetupForm.controls;

    return [
      controls.contactFirstName,
      controls.contactLastName,
      controls.contactEmail,
      controls.contactPhone,
    ].some((control) => control.invalid && control.touched);
  }

  private scrollToFirstInvalidSection(): void {
    const firstInvalidControlName = Object.entries(this.profileSetupForm.controls).find(
      ([, control]) => control.enabled && control.invalid,
    )?.[0];

    if (!firstInvalidControlName) {
      return;
    }

    queueMicrotask(() => {
      const invalidElement =
        this.profileSetupFormElement()?.nativeElement.querySelector<HTMLElement>(
          `[formcontrolname="${firstInvalidControlName}"]`,
        );

      invalidElement?.focus({ preventScroll: true });
      invalidElement?.closest<HTMLElement>('.profile-setup-card')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
}
