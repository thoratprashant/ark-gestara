import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export type TimelineItemDialogMode = 'category' | 'medication';

export interface TimelineItemDialogData {
  existingCategoryNames: string[];
}

export interface TimelineItemDialogResult {
  dosage?: string;
  endWeek: number;
  mode: TimelineItemDialogMode;
  name: string;
  startWeek: number;
}

function medicationWeekRangeValidator(control: AbstractControl): ValidationErrors | null {
  const startWeek = control.get('startWeek')?.value as number | null;
  const endWeek = control.get('endWeek')?.value as number | null;

  return startWeek !== null && endWeek !== null && endWeek < startWeek
    ? { endWeekBeforeStart: true }
    : null;
}

@Component({
  selector: 'app-timeline-item-dialog',
  standalone: false,
  templateUrl: './timeline-item-dialog.html',
  styleUrl: './timeline-item-dialog.scss',
})
export class TimelineItemDialog {
  private readonly dialogData = inject<TimelineItemDialogData | null>(MAT_DIALOG_DATA, {
    optional: true,
  });

  readonly mode = signal<TimelineItemDialogMode>('category');
  readonly duplicateCategoryName = signal<string | null>(null);
  readonly categoryForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    startWeek: new FormControl(28.5, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(40)],
    }),
    endWeek: new FormControl(32.5, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(40)],
    }),
  });
  readonly medicationForm = new FormGroup(
    {
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      dosage: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      startWeek: new FormControl<number | null>(28.5, [Validators.min(0), Validators.max(40)]),
      endWeek: new FormControl<number | null>(null, [Validators.min(0), Validators.max(40)]),
    },
    { validators: medicationWeekRangeValidator },
  );

  constructor(private readonly dialogRef: MatDialogRef<TimelineItemDialog>) {}

  setMode(mode: TimelineItemDialogMode): void {
    this.mode.set(mode);

    if (mode !== 'category') {
      this.duplicateCategoryName.set(null);
    }
  }

  clearCategoryDuplicateError(): void {
    this.duplicateCategoryName.set(null);
  }

  submit(): void {
    if (this.mode() === 'category') {
      const value = this.categoryForm.getRawValue();
      const normalizedName = value.name.trim().toLowerCase();
      const duplicateName = this.dialogData?.existingCategoryNames.find(
        (name) => name.trim().toLowerCase() === normalizedName,
      );

      if (duplicateName) {
        this.duplicateCategoryName.set(duplicateName);
        return;
      }

      if (this.categoryForm.invalid) {
        this.categoryForm.markAllAsTouched();
        return;
      }

      if (value.endWeek < value.startWeek) {
        this.categoryForm.controls.endWeek.setErrors({ beforeStart: true });
        return;
      }

      this.dialogRef.close({
        endWeek: value.endWeek,
        mode: 'category',
        name: value.name.trim(),
        startWeek: value.startWeek,
      });
      return;
    }

    if (this.medicationForm.invalid) {
      this.medicationForm.markAllAsTouched();
      return;
    }

    const value = this.medicationForm.getRawValue();
    this.dialogRef.close({
      dosage: value.dosage.trim(),
      endWeek: value.endWeek ?? 40,
      mode: 'medication',
      name: value.name.trim(),
      startWeek: value.startWeek ?? 0,
    });
  }
}
