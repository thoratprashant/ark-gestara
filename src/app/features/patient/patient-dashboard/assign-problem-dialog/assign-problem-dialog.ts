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
  private readonly dialogData = inject<AssignProblemDialogData>(MAT_DIALOG_DATA);

  readonly problemOptions = ['Thyroid function', 'Vitamin D deficiency', 'Iron deficiency anemia'];
  readonly categoryOptions = ['Endocrine', 'Hematology', 'Maternal health'];
  readonly taskOptions = ['Review lab results', 'Repeat laboratory test', 'Patient follow-up'];

  readonly form = new FormGroup({
    problem: new FormControl(this.dialogData.problem, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    category: new FormControl(this.dialogData.category, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    task: new FormControl(this.dialogData.task, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    private readonly dialogRef: MatDialogRef<AssignProblemDialog, AssignProblemDialogResult>,
  ) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close({ resultId: this.dialogData.resultId, ...this.form.getRawValue() });
  }
}
