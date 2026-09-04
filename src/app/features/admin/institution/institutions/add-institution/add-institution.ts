import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

type InstitutionPageMode = 'add' | 'view' | 'edit';

@Component({
  selector: 'app-add-institution',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButton,
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
  private readonly route = inject(ActivatedRoute);
  private readonly routeParams = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  protected readonly institutionTypes = ['Hospital', 'Clinic', 'Health Center', 'Institute'];
  protected readonly cities = ['Austin', 'New York', 'Chicago', 'Houston', 'Miami', 'Denver'];
  protected readonly states = ['Texas', 'New York', 'Illinois', 'Florida', 'Colorado'];
  protected readonly mode = computed<InstitutionPageMode>(() => {
    const mode = this.routeParams().get('mode');
    return mode === 'view' || mode === 'edit' ? mode : 'add';
  });
  protected readonly isViewMode = computed(() => this.mode() === 'view');
  protected readonly breadcrumbLabel = computed(() => {
    if (this.mode() === 'view') return 'View Greenfield Medical Center';
    if (this.mode() === 'edit') return 'Edit Greenfield Medical Center';
    return 'Add New Institution';
  });
  protected readonly submitLabel = computed(() =>
    this.mode() === 'edit' ? 'Save Changes' : 'Add Institution',
  );

  protected readonly institutionForm = this.formBuilder.nonNullable.group({
    institutionName: ['', Validators.required],
    legalBusinessName: [''],
    institutionType: ['', Validators.required],
    organizationNpi: [''],
    organizationIdentifier: [''],
    website: [''],
    numberOfProviders: ['', [Validators.min(0), Validators.pattern(/^\d+$/)]],
    addressLine1: ['', Validators.required],
    addressLine2: [''],
    state: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],
    primaryFirstName: ['', Validators.required],
    primaryLastName: ['', Validators.required],
    primaryJobTitle: [''],
    primaryEmail: ['', [Validators.required, Validators.email]],
    primaryPhone: ['', Validators.required],
    adminFirstName: ['', Validators.required],
    adminLastName: ['', Validators.required],
    adminJobTitle: [''],
    adminEmail: ['', [Validators.required, Validators.email]],
    adminPhone: ['', Validators.required],
    status: ['', Validators.required],
    internalNotes: [''],
  });

  constructor() {
    effect(() => {
      const mode = this.mode();
      this.institutionForm.reset(
        mode === 'add' ? this.emptyInstitution : this.greenfieldInstitution,
      );
      if (mode === 'view') this.institutionForm.disable({ emitEvent: false });
      else this.institutionForm.enable({ emitEvent: false });
    });
  }

  protected submitInstitution(): void {
    if (this.isViewMode()) return;
    if (this.institutionForm.invalid) {
      this.institutionForm.markAllAsTouched();
      return;
    }
    void this.router.navigate(['/admin', 'institution', 'institutions']);
  }

  protected cancel(): void {
    void this.router.navigate(['/admin', 'institution', 'institutions']);
  }

  protected copyPrimaryContact(): void {
    if (this.isViewMode()) return;

    const controls = this.institutionForm.controls;
    this.institutionForm.patchValue({
      adminFirstName: controls.primaryFirstName.value,
      adminLastName: controls.primaryLastName.value,
      adminJobTitle: controls.primaryJobTitle.value,
      adminEmail: controls.primaryEmail.value,
      adminPhone: controls.primaryPhone.value,
    });

    [
      controls.adminFirstName,
      controls.adminLastName,
      controls.adminJobTitle,
      controls.adminEmail,
      controls.adminPhone,
    ].forEach((control) => control.markAsDirty());
  }

  private readonly emptyInstitution = {
    institutionName: '',
    legalBusinessName: '',
    institutionType: '',
    organizationNpi: '',
    organizationIdentifier: '',
    website: '',
    numberOfProviders: '',
    addressLine1: '',
    addressLine2: '',
    state: '',
    city: '',
    zipCode: '',
    primaryFirstName: '',
    primaryLastName: '',
    primaryJobTitle: '',
    primaryEmail: '',
    primaryPhone: '',
    adminFirstName: '',
    adminLastName: '',
    adminJobTitle: '',
    adminEmail: '',
    adminPhone: '',
    status: '',
    internalNotes: '',
  };

  private readonly greenfieldInstitution = {
    institutionName: 'Greenfield Medical Center',
    legalBusinessName: 'Greenfield Medical Holdings LLC',
    institutionType: 'Hospital',
    organizationNpi: '1234567890',
    organizationIdentifier: 'GRN-MED-2024',
    website: 'www.greenfieldmedical.org',
    numberOfProviders: '',
    addressLine1: '4200 Wellness Boulevard',
    addressLine2: 'Tower B, Floor 12',
    state: 'Texas',
    city: 'Austin',
    zipCode: '73301',
    primaryFirstName: 'Sarah',
    primaryLastName: 'Mitchell',
    primaryJobTitle: 'Chief Operating Officer',
    primaryEmail: 's.mitchell@greenfieldmed.org',
    primaryPhone: '+1 512-555-0147',
    adminFirstName: 'James',
    adminLastName: 'Whitfield',
    adminJobTitle: 'IT Director',
    adminEmail: 'j.whitfield@greenfieldmed.org',
    adminPhone: '+1 512-555-0293',
    status: 'Active',
    internalNotes:
      'Tier 2 partner since January 2024. Annual contract renewal in Q1. Preferred support channel: dedicated Slack.',
  };
}
