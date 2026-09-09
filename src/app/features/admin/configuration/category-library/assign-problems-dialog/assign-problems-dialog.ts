import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoryProblem } from '../category-library.models';

export const ASSIGN_PROBLEMS_DIALOG_CONFIG = {
  width: '640px',
  maxWidth: 'calc(100vw - 32px)',
  maxHeight: 'calc(100dvh - 32px)',
  panelClass: 'assign-library-dialog-panel',
  autoFocus: 'input',
  ariaLabelledBy: 'assign-problems-title',
};

@Component({
  selector: 'app-assign-problems-dialog',
  imports: [FormsModule, MatButton, MatDialogModule, MatTooltipModule],
  templateUrl: './assign-problems-dialog.html',
  styleUrl: './assign-problems-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignProblemsDialog {
  private readonly ref = inject<MatDialogRef<AssignProblemsDialog, CategoryProblem[]>>(MatDialogRef);
  private readonly current = inject<CategoryProblem[]>(MAT_DIALOG_DATA);

  protected readonly query = signal('');
  protected readonly selectedIds = signal(new Set(this.current.map((problem) => problem.id)));
  protected readonly problems: CategoryProblem[] = [
    { id: 1, code: 'O13.3', name: 'Routine Prenatal Care', sequence: 1, status: 'Active' },
    { id: 2, code: 'O14.3', name: 'Gestational Diabetes Mellitus', sequence: 2, status: 'Active' },
    { id: 3, code: 'O16.3', name: 'Anemia in Pregnancy', sequence: 3, status: 'Active' },
    { id: 4, code: 'O16.3', name: 'Hypertension in Pregnancy', sequence: 4, status: 'Active' },
    { id: 5, code: 'O17.3', name: 'Preeclampsia', sequence: 5, status: 'Active' },
    { id: 6, code: 'O18.3', name: 'Placenta Previa', sequence: 6, status: 'Draft' },
    { id: 7, code: 'O19.3', name: 'Preterm Labor', sequence: 7, status: 'Active' },
    { id: 8, code: 'O20.3', name: 'Ectopic Pregnancy', sequence: 8, status: 'Active' },
  ];

  protected readonly filtered = computed(() => {
    const query = this.query().trim().toLowerCase();
    return this.problems.filter(
      (problem) =>
        !query ||
        problem.name.toLowerCase().includes(query) ||
        problem.code.toLowerCase().includes(query),
    );
  });

  protected toggle(problem: CategoryProblem): void {
    this.selectedIds.update((selected) => {
      const next = new Set(selected);
      if (next.has(problem.id)) {
        next.delete(problem.id);
      } else {
        next.add(problem.id);
      }
      return next;
    });
  }

  protected assign(): void {
    const selected = this.problems.filter((problem) => this.selectedIds().has(problem.id));
    this.ref.close(selected);
  }
}
