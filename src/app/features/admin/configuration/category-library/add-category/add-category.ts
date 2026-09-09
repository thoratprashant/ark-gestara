import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { CategoryProblem, CategoryTask } from '../category-library.models';
import {
  ASSIGN_PROBLEMS_DIALOG_CONFIG,
  AssignProblemsDialog,
} from '../assign-problems-dialog/assign-problems-dialog';
import {
  ASSIGN_TASKS_DIALOG_CONFIG,
  AssignTasksDialog,
} from '../assign-tasks-dialog/assign-tasks-dialog';

@Component({
  selector: 'app-add-category',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTooltipModule,
    RouterLink,
  ],
  templateUrl: './add-category.html',
  styleUrl: './add-category.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCategory {
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.pattern(/\S/)]],
    description: ['', [Validators.required, Validators.pattern(/\S/)]],
    sequence: [1, [Validators.required, Validators.min(1)]],
    status: ['Draft' as const, Validators.required],
  });

  protected readonly problems = signal<CategoryProblem[]>([]);
  protected readonly tasks = signal<CategoryTask[]>([]);
  protected readonly message = signal('');
  protected readonly sequenceOptions = [1, 2, 3, 4, 5];

  protected readonly statusValue = computed(() => this.form.controls.status.value);

  protected openProblemDialog(): void {
    const ref = this.dialog.open<AssignProblemsDialog, CategoryProblem[], CategoryProblem[]>(
      AssignProblemsDialog,
      {
        ...ASSIGN_PROBLEMS_DIALOG_CONFIG,
        data: this.problems(),
      },
    );

    ref.afterClosed().subscribe((selected) => {
      if (selected) this.problems.set(selected);
    });
  }

  protected openTaskDialog(): void {
    const ref = this.dialog.open<AssignTasksDialog, CategoryTask[], CategoryTask[]>(
      AssignTasksDialog,
      {
        ...ASSIGN_TASKS_DIALOG_CONFIG,
        data: this.tasks(),
      },
    );

    ref.afterClosed().subscribe((selected) => {
      if (selected) this.tasks.set(selected);
    });
  }

  protected removeProblem(problemId: number): void {
    this.problems.update((items) => items.filter((item) => item.id !== problemId));
  }

  protected removeTask(taskId: number): void {
    this.tasks.update((items) => items.filter((item) => item.id !== taskId));
  }

  protected save(asDraft = false): void {
    if (asDraft) this.form.controls.status.setValue('Draft');
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.message.set(asDraft ? 'Category saved as draft.' : 'Category submitted.');
  }

  protected cancel(): void {
    this.router.navigate(['/admin', 'configuration', 'category-library']);
  }
}
