import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  TemplateRef,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
interface IcdRecord {
  code: string;
  description: string;
  trimester: string;
}
@Component({
  selector: 'app-icd-master',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterLink,
  ],
  templateUrl: './icd-master.html',
  styleUrl: './icd-master.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcdMaster {
  private readonly fb = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);
  private editorRef?: MatDialogRef<unknown>;
  protected closeEditor(): void {
    this.editorRef?.close();
  }
  protected readonly query = signal('');
  protected readonly trimester = signal('');
  protected readonly page = signal(1);
  protected readonly pageSize = 10;
  protected readonly records = signal<IcdRecord[]>([
    ...[
      ['O09.00', 'unspecified trimester', '-'],
      ['O09.01', 'first trimester', '1st'],
      ['O09.02', 'second trimester', '2nd'],
      ['O09.03', 'third trimester', '3rd'],
    ].map(([code, suffix, trimester]) => ({
      code,
      description: `Supervision of pregnancy with history of infertility, ${suffix}`,
      trimester,
    })),
    ...[
      ['O09.10', 'unspecified trimester', '-'],
      ['O09.11', 'first trimester', '1st'],
      ['O09.12', 'second trimester', '2nd'],
    ].map(([code, suffix, trimester]) => ({
      code,
      description: `Supervision of pregnancy with history of ectopic pregnancy, ${suffix}`,
      trimester,
    })),
    ...[
      ['O09.211', 'first trimester', '1st'],
      ['O09.212', 'second trimester', '2nd'],
      ['O09.213', 'third trimester', '3rd'],
    ].map(([code, suffix, trimester]) => ({
      code,
      description: `Supervision of pregnancy with history of pre-term labor, ${suffix}`,
      trimester,
    })),
  ]);
  protected readonly filtered = computed(() =>
    this.records().filter(
      (row) =>
        `${row.code} ${row.description}`
          .toLowerCase()
          .includes(this.query().trim().toLowerCase()) &&
        (!this.trimester() || row.trimester === this.trimester()),
    ),
  );
  protected readonly pages = computed(() =>
    Array.from(
      { length: Math.max(1, Math.ceil(this.filtered().length / this.pageSize)) },
      (_, i) => i + 1,
    ),
  );
  protected readonly visible = computed(() =>
    this.filtered().slice((this.page() - 1) * this.pageSize, this.page() * this.pageSize),
  );
  protected readonly editing = signal<string | null>(null);
  protected readonly error = signal('');
  protected readonly form = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.pattern(/^[A-Za-z]\d{2}(\.[A-Za-z0-9]{1,4})?$/)]],
    description: ['', [Validators.required, Validators.pattern(/\S/)]],
    trimester: ['-'],
  });
  protected search(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.page.set(1);
  }
  protected filter(value: string): void {
    this.trimester.set(value);
    this.page.set(1);
  }
  protected goToPage(page: number, table: HTMLElement): void {
    if (page < 1 || page > this.pages().length) return;
    this.page.set(page);
    table.scrollTop = 0;
  }
  protected open(dialog: TemplateRef<unknown>, row?: IcdRecord): void {
    this.editing.set(row?.code ?? null);
    this.error.set('');
    this.form.reset(row ?? { code: '', description: '', trimester: '-' });
    this.editorRef = this.dialog.open(dialog, {
      width: '520px',
      maxWidth: 'calc(100vw - 32px)',
      autoFocus: 'input',
    });
  }
  protected save(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    const record = {
      ...value,
      code: value.code.trim().toUpperCase(),
      description: value.description.trim(),
    };
    if (this.records().some((row) => row.code === record.code && row.code !== this.editing())) {
      this.error.set('This ICD code already exists.');
      return;
    }
    this.records.update((rows) =>
      this.editing()
        ? rows.map((row) => (row.code === this.editing() ? record : row))
        : [...rows, record],
    );
    this.query.set('');
    this.trimester.set('');
    this.page.set(Math.ceil(this.records().length / this.pageSize));
    this.closeEditor();
  }
}

