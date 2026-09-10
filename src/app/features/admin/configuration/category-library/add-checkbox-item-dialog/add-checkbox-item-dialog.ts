import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface CheckboxItemDialogData {
  nextId: number;
  nextSequence: number;
}

export interface CheckboxItemDialogResult {
  id: number;
  name: string;
  requiresNotes: boolean;
  sequence: number;
}

export const ADD_CHECKBOX_ITEM_DIALOG_CONFIG = {
  width: '540px',
  maxWidth: 'calc(100vw - 32px)',
  maxHeight: 'calc(100dvh - 32px)',
  panelClass: 'add-checkbox-item-dialog-panel',
  autoFocus: false,
  restoreFocus: true,
  ariaLabelledBy: 'add-checkbox-item-title',
};

@Component({
  selector: 'app-add-checkbox-item-dialog',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
  ],
  templateUrl: './add-checkbox-item-dialog.html',
  styleUrl: './add-checkbox-item-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCheckboxItemDialog {
  private readonly data = inject<CheckboxItemDialogData>(MAT_DIALOG_DATA);
  private readonly ref =
    inject<MatDialogRef<AddCheckboxItemDialog, CheckboxItemDialogResult>>(MatDialogRef);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.pattern(/\S/)]],
    requiresNotes: [false],
    sequence: [this.data.nextSequence, [Validators.required, Validators.min(1)]],
  });

  protected toggleNotes(): void {
    const control = this.form.controls.requiresNotes;
    control.setValue(!control.value);
  }

  protected addItem(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.ref.close({
      id: this.data.nextId,
      name: this.form.controls.name.value.trim(),
      requiresNotes: this.form.controls.requiresNotes.value,
      sequence: this.form.controls.sequence.value,
    });
  }
}
