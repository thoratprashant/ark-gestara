import { MatTooltipModule } from '@angular/material/tooltip';
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
export interface IcdRecord {
  code: string;
  description: string;
  trimester: string;
}
export interface AddIcdDialogData {
  record?: IcdRecord;
  existingCodes: string[];
}
export const ICD_DIALOG_CONFIG = {
  width: '500px',
  maxWidth: 'calc(100vw - 32px)',
  maxHeight: 'calc(100dvh - 32px)',
  panelClass: 'add-icd-dialog-panel',
  backdropClass: 'add-icd-dialog-backdrop',
  autoFocus: 'input',
  ariaLabelledBy: 'add-icd-title',
};
@Component({
  selector: 'app-add-icd-dialog',
  imports: [
    MatTooltipModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './add-icd-dialog.html',
  styleUrl: './add-icd-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddIcdDialog {
  protected readonly data = inject<AddIcdDialogData>(MAT_DIALOG_DATA);
  private readonly ref = inject<MatDialogRef<AddIcdDialog, IcdRecord>>(MatDialogRef);
  protected readonly error = signal('');
  protected readonly form = inject(FormBuilder).nonNullable.group({
    code: [
      this.data.record?.code ?? '',
      [Validators.required, Validators.pattern(/^[A-Za-z]\d{2}(\.[A-Za-z0-9]{1,4})?$/)],
    ],
    description: [
      this.data.record?.description ?? '',
      [Validators.required, Validators.pattern(/\S/)],
    ],
    trimester: [this.data.record?.trimester ?? '', Validators.required],
  });
  protected submit(): void {
    this.form.markAllAsTouched();
    this.error.set('');
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    const record = {
      ...value,
      code: value.code.toUpperCase().trim(),
      description: value.description.trim(),
    };
    if (
      this.data.existingCodes.some(
        (code) => code.toUpperCase() === record.code && code !== this.data.record?.code,
      )
    ) {
      this.error.set('This ICD code already exists.');
      return;
    }
    this.ref.close(record);
  }
}
