import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-institution',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
  ],
  templateUrl: './add-institution.html',
  styleUrl: './add-institution.scss',
})
export class AddInstitution {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  protected readonly institutionTypes = ['Hospital', 'Clinic', 'Health Center', 'Institute'];
  protected readonly cities = ['New York', 'Chicago', 'Houston', 'Miami', 'Denver'];
  protected readonly states = ['New York', 'Illinois', 'Texas', 'Florida', 'Colorado'];
  protected readonly zipCodes = ['10001', '60601', '77001', '33101', '80201'];

  protected readonly institutionForm = this.formBuilder.nonNullable.group({
    institutionName: ['', Validators.required],
    institutionType: ['', Validators.required],
    organizationIdentifier: [''],
    primaryContactName: ['', Validators.required],
    primaryContactEmail: ['', [Validators.required, Validators.email]],
    primaryContactPhone: ['', Validators.required],
    addressLine1: ['', Validators.required],
    addressLine2: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
    status: ['Active', Validators.required],
    internalNotes: [''],
  });

  protected submitInstitution(): void {
    if (this.institutionForm.invalid) {
      this.institutionForm.markAllAsTouched();
      return;
    }

    void this.router.navigate(['/admin', 'Institution', 'Institutions']);
  }

  protected cancel(): void {
    void this.router.navigate(['/admin', 'Institution', 'Institutions']);
  }
}
