import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface AssignProblemDialogData {
  category: string;
  problem: string;
  resultId: string;
  task: string;
}

export type AssignProblemDialogResult = AssignProblemDialogData;

@Component({
  selector: 'app-assign-problem-dialog',
  standalone: false,
  templateUrl: './assign-problem-dialog.html',
  styleUrl: './assign-problem-dialog.scss',
})
export class AssignProblemDialog {
  private readonly data = inject<AssignProblemDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject<
    MatDialogRef<AssignProblemDialog, AssignProblemDialogResult>
  >(MatDialogRef);

  readonly problemOptions = [
    'Thyroid function',
    'Vitamin D deficiency',
    'Iron deficiency anemia',
  ];
  readonly categoryOptions = ['Endocrine', 'Hematology', 'Maternal health'];
  readonly taskOptions = ['Review lab results', 'Repeat laboratory test', 'Patient follow-up'];

  readonly form = new FormGroup({
    problem: new FormControl(this.data.problem, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    category: new FormControl(this.data.category, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    task: new FormControl(this.data.task, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close({ resultId: this.data.resultId, ...this.form.getRawValue() });
  }
}
