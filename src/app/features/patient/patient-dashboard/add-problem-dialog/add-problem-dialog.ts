import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

export interface AddProblemDialogResult {
  name: string;
}

@Component({
  selector: 'app-add-problem-dialog',
  standalone: false,
  templateUrl: './add-problem-dialog.html',
  styleUrl: './add-problem-dialog.scss',
})
export class AddProblemDialog {
  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(private readonly dialogRef: MatDialogRef<AddProblemDialog>) {}

  submit(): void {
    const name = this.form.controls.name.value.trim();

    if (this.form.invalid || !name) {
      this.form.controls.name.setErrors({ required: true });
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close({ name });
  }
}
