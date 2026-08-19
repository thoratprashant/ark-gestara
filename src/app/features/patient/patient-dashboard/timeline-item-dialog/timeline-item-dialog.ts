import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

export type TimelineItemDialogMode = 'task' | 'medication';

export interface TimelineItemDialogResult {
  dosage?: string;
  endWeek: number;
  mode: TimelineItemDialogMode;
  name: string;
  startWeek: number;
}

@Component({
  selector: 'app-timeline-item-dialog',
  standalone: false,
  templateUrl: './timeline-item-dialog.html',
  styleUrl: './timeline-item-dialog.scss',
})
export class TimelineItemDialog {
  readonly mode = signal<TimelineItemDialogMode>('task');
  readonly taskForm = new FormGroup({
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
  readonly medicationForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    dosage: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    startWeek: new FormControl<number | null>(28.5, [Validators.min(0), Validators.max(40)]),
  });

  constructor(private readonly dialogRef: MatDialogRef<TimelineItemDialog>) {}

  setMode(mode: TimelineItemDialogMode): void {
    this.mode.set(mode);
  }

  submit(): void {
    if (this.mode() === 'task') {
      if (this.taskForm.invalid) {
        this.taskForm.markAllAsTouched();
        return;
      }

      const value = this.taskForm.getRawValue();

      if (value.endWeek < value.startWeek) {
        this.taskForm.controls.endWeek.setErrors({ beforeStart: true });
        return;
      }

      this.dialogRef.close({
        endWeek: value.endWeek,
        mode: 'task',
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
      endWeek: 40,
      mode: 'medication',
      name: value.name.trim(),
      startWeek: value.startWeek ?? 0,
    });
  }
}
