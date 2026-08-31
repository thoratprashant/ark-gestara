import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

interface ProvisionAdminNavigationState {
  readonly institution?: string;
  readonly adminName?: string;
  readonly email?: string;
  readonly status?: string;
}

@Component({
  selector: 'app-provision-institution-admin',
  imports: [ReactiveFormsModule, MatButton, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './provision-institution-admin.html',
  styleUrl: './provision-institution-admin.scss',
})
export class ProvisionInstitutionAdmin {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly navigationState = inject(Location).getState() as ProvisionAdminNavigationState;
  private readonly adminName = (this.navigationState.adminName ?? 'John Doe').trim();
  private readonly nameParts = this.adminName.split(/\s+/);

  protected readonly isViewMode = this.route.snapshot.paramMap.get('mode') === 'view';
  protected readonly institutionIds = ['INST-12345', 'INST-12346', 'INST-12347'];
  protected readonly institutionTypes = ['Hospital', 'Clinic', 'Health Center'];

  protected readonly adminForm = this.formBuilder.nonNullable.group({
    institutionName: [
      this.navigationState.institution ?? 'City General Hospital',
      Validators.required,
    ],
    institutionId: ['INST-12345', Validators.required],
    institutionType: ['Hospital', Validators.required],
    status: [this.navigationState.status ?? 'Active', Validators.required],
    dateCreated: ['2024-01-15', Validators.required],
    firstName: [this.nameParts[0] ?? 'John', Validators.required],
    lastName: [this.nameParts.slice(1).join(' ') || 'Doe', Validators.required],
    email: [
      this.navigationState.email ?? 'acdvfbghn345@gmail.com',
      [Validators.required, Validators.email],
    ],
    contactNumber: ['96543456789', Validators.required],
  });

  constructor() {
    if (this.isViewMode) {
      this.adminForm.disable();
    }
  }

  protected submit(): void {
    if (this.isViewMode) {
      return;
    }

    if (this.adminForm.invalid) {
      this.adminForm.markAllAsTouched();
      return;
    }

    this.navigateToList();
  }

  protected cancel(): void {
    this.navigateToList();
  }

  private navigateToList(): void {
    void this.router.navigate(['/admin', 'institution', 'institution-admins']);
  }
}
