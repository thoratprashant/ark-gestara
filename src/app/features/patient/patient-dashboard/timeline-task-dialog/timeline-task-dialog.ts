import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

export interface TimelineTaskDialogResult {
  endWeek: number;
  name: string;
  startWeek: number;
}

function taskWeekRangeValidator(control: AbstractControl): ValidationErrors | null {
  const startWeek = control.get('startWeek')?.value as number | null;
  const endWeek = control.get('endWeek')?.value as number | null;

  return startWeek !== null && endWeek !== null && endWeek <= startWeek
    ? { invalidWeekRange: true }
    : null;
}

@Component({
  selector: 'app-timeline-task-dialog',
  standalone: false,
  templateUrl: './timeline-task-dialog.html',
  styleUrl: './timeline-task-dialog.scss',
})
export class TimelineTaskDialog {
  readonly weekOptions = Array.from({ length: 41 }, (_, week) => week);
  readonly form = new FormGroup(
    {
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(80)],
      }),
      startWeek: new FormControl<number | null>(null, [Validators.required]),
      endWeek: new FormControl<number | null>(null, [Validators.required]),
    },
    { validators: taskWeekRangeValidator },
  );

  constructor(private readonly dialogRef: MatDialogRef<TimelineTaskDialog>) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    this.dialogRef.close({
      endWeek: value.endWeek,
      name: value.name.trim(),
      startWeek: value.startWeek,
    } as TimelineTaskDialogResult);
  }
}
