import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { AddIcdDialog, IcdRecord, ICD_DIALOG_CONFIG } from '../add-icd-dialog/add-icd-dialog';
@Component({
  selector: 'app-icd-master',
  imports: [
    MatTooltipModule,
    MatDialogModule,
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
  private readonly dialog = inject(MatDialog);
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
  protected open(row?: IcdRecord): void {
    this.dialog
      .open(AddIcdDialog, {
        ...ICD_DIALOG_CONFIG,
        data: { record: row, existingCodes: this.records().map((item) => item.code) },
      })
      .afterClosed()
      .subscribe((record: IcdRecord | undefined) => {
        if (!record) return;
        this.records.update((rows) =>
          row ? rows.map((item) => (item.code === row.code ? record : item)) : [...rows, record],
        );
        this.query.set('');
        this.trimester.set('');
        this.page.set(Math.ceil(this.records().length / this.pageSize));
      });
  }
}
