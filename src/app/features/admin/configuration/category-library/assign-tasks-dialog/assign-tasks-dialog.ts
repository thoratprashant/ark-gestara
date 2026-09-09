import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoryTask } from '../category-library.models';

export const ASSIGN_TASKS_DIALOG_CONFIG = {
  width: '600px',
  maxWidth: 'calc(100vw - 32px)',
  maxHeight: 'calc(100dvh - 32px)',
  panelClass: 'assign-library-dialog-panel',
  autoFocus: 'input',
  ariaLabelledBy: 'assign-tasks-title',
};

@Component({
  selector: 'app-assign-tasks-dialog',
  imports: [FormsModule, MatButton, MatDialogModule, MatTooltipModule],
  templateUrl: './assign-tasks-dialog.html',
  styleUrl: './assign-tasks-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignTasksDialog {
  private readonly ref = inject<MatDialogRef<AssignTasksDialog, CategoryTask[]>>(MatDialogRef);
  private readonly current = inject<CategoryTask[]>(MAT_DIALOG_DATA);

  protected readonly query = signal('');
  protected readonly selectedIds = signal(new Set(this.current.map((task) => task.id)));
  protected readonly tasks: CategoryTask[] = [
    { id: 1, name: 'Labs (Baseline)', sequence: 1, status: 'Active' },
    { id: 2, name: 'Labs (Repeat)', sequence: 2, status: 'Active' },
    { id: 3, name: 'Aneuploidy Screening', sequence: 3, status: 'Pending' },
    { id: 4, name: 'Genetic Screening (Baseline)', sequence: 4, status: 'Draft' },
    { id: 5, name: 'Ultrasounds (Baseline)', sequence: 5, status: 'Draft' },
    { id: 6, name: 'Ultrasounds (Repeat)', sequence: 6, status: 'Draft' },
    { id: 7, name: 'Vaccines', sequence: 7, status: 'Draft' },
  ];

  protected readonly filtered = computed(() => {
    const query = this.query().trim().toLowerCase();
    return this.tasks.filter((task) => !query || task.name.toLowerCase().includes(query));
  });

  protected toggle(task: CategoryTask): void {
    this.selectedIds.update((selected) => {
      const next = new Set(selected);
      if (next.has(task.id)) {
        next.delete(task.id);
      } else {
        next.add(task.id);
      }
      return next;
    });
  }

  protected assign(): void {
    const selected = this.tasks.filter((task) => this.selectedIds().has(task.id));
    this.ref.close(selected);
  }
}
