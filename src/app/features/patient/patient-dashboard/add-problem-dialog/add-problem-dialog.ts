import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { SuggestiveOption } from '../../../../shared/components/suggestive-input/suggestive-input';

interface ProblemOption {
  name: string;
  code: string;
}

export interface AddProblemDialogResult {
  name: string;
  icd10Code?: string;
  saveToFavorites?: boolean;
}

@Component({
  selector: 'app-add-problem-dialog',
  standalone: false,
  templateUrl: './add-problem-dialog.html',
  styleUrl: './add-problem-dialog.scss',
})
export class AddProblemDialog {
  readonly favorites: ProblemOption[] = [
    { name: 'Essential Hypertension', code: 'I10' },
    { name: 'Type 2 Diabetes Mellitus', code: 'E11.9' },
    { name: 'Major Depressive Disorder, Recurrent', code: 'F33.0' },
    { name: 'Chronic Low Back Pain', code: 'M54.5' },
    { name: 'Generalized Anxiety Disorder', code: 'F41.1' },
    { name: 'Gastroesophageal Reflux Disease', code: 'K21.9' },
  ];

  readonly problemLibrary: ProblemOption[] = [
    { name: 'Acute Bronchitis', code: 'J20.9' },
    { name: 'Chronic Obstructive Pulmonary Disease', code: 'J44.1' },
    { name: 'Asthma, Unspecified', code: 'J45.909' },
    { name: 'Mild Intermittent Asthma', code: 'J45.20' },
    { name: 'Mild Persistent Asthma', code: 'J45.30' },
    { name: 'Community Acquired Pneumonia', code: 'J18.9' },
  ];

  readonly icd10Suggestions: SuggestiveOption[] = [
    { value: 'J45.20', label: 'Mild intermittent asthma, uncomplicated' },
    { value: 'J45.30', label: 'Mild persistent asthma, uncomplicated' },
    { value: 'J45.909', label: 'Unspecified asthma, uncomplicated' },
    { value: 'I10', label: 'Essential (primary) hypertension' },
    { value: 'E11.9', label: 'Type 2 diabetes mellitus without complications' },
    { value: 'F33.0', label: 'Major depressive disorder, recurrent, mild' },
  ];

  filteredProblemLibrary = this.problemLibrary;
  favoritesExpanded = true;
  saveToFavorites = false;

  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    icd10Code: new FormControl('', { nonNullable: true }),
  });

  constructor(private readonly dialogRef: MatDialogRef<AddProblemDialog>) {}

  filterProblemLibrary(event: Event): void {
    const query = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    this.filteredProblemLibrary = this.problemLibrary.filter((problem) =>
      `${problem.name} ${problem.code}`.toLocaleLowerCase().includes(query),
    );
  }

  toggleFavorites(): void {
    this.favoritesExpanded = !this.favoritesExpanded;
  }

  toggleSaveToFavorites(): void {
    this.saveToFavorites = !this.saveToFavorites;
  }

  submit(): void {
    const name = this.form.controls.name.value.trim();
    const icd10Code = this.form.controls.icd10Code.value.trim();

    if (this.form.invalid || !name) {
      this.form.controls.name.setErrors({ required: true });
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close({
      name,
      ...(icd10Code ? { icd10Code } : {}),
      saveToFavorites: this.saveToFavorites,
    });
  }
}
