import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrderTaskAssociation } from '../order-task-association.model';

interface TaskOption extends OrderTaskAssociation {
  note?: string;
}

interface TaskCategoryGroup {
  id: number;
  name: string;
  tasks: TaskOption[];
}

interface TaskProblemGroup {
  id: number;
  name: string;
  categories: TaskCategoryGroup[];
}

export const ASSOCIATE_ORDER_TASK_DIALOG_CONFIG = {
  width: '580px',
  maxWidth: 'calc(100vw - 32px)',
  maxHeight: 'calc(100dvh - 32px)',
  panelClass: 'task-association-dialog-panel',
  autoFocus: 'input',
  restoreFocus: true,
  ariaLabelledBy: 'associate-order-tasks-title',
};

@Component({
  selector: 'app-associate-order-task-dialog',
  imports: [FormsModule, MatButton, MatDialogModule, MatTooltipModule],
  templateUrl: './associate-order-task-dialog.html',
  styleUrl: './associate-order-task-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssociateOrderTaskDialog {
  private readonly ref =
    inject<MatDialogRef<AssociateOrderTaskDialog, OrderTaskAssociation[]>>(MatDialogRef);
  protected readonly query = signal('');
  protected readonly expandedProblemIds = signal(new Set([1, 2]));
  protected readonly expandedCategoryIds = signal(new Set([11, 12, 13, 21]));
  protected readonly selectedIds = signal(new Set([1, 3, 7, 8]));

  protected readonly groups: TaskProblemGroup[] = [
    {
      id: 1,
      name: 'Routine Prenatal Care',
      categories: [
        {
          id: 11,
          name: 'Routine Labs',
          tasks: [
            {
              id: 1,
              name: 'First Trimester Labs',
              category: 'Routine Labs',
              problem: 'Routine Prenatal Care',
              sequence: 1,
            },
            {
              id: 2,
              name: 'Third Trimester Labs',
              category: 'Routine Labs',
              problem: 'Routine Prenatal Care',
              sequence: 2,
            },
          ],
        },
        {
          id: 12,
          name: 'Genetic Screening',
          tasks: [
            {
              id: 3,
              name: 'Genetic Screening',
              category: 'Genetic Screening',
              problem: 'Routine Prenatal Care',
              sequence: 3,
              note: 'Also in GDM Monitoring',
            },
          ],
        },
        {
          id: 13,
          name: 'Imaging',
          tasks: [
            {
              id: 4,
              name: 'NT Scan',
              category: 'Imaging',
              problem: 'Routine Prenatal Care',
              sequence: 4,
            },
            {
              id: 5,
              name: 'Anatomy Ultrasound',
              category: 'Imaging',
              problem: 'Routine Prenatal Care',
              sequence: 5,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Gestational Diabetes Management',
      categories: [
        {
          id: 21,
          name: 'GDM Monitoring',
          tasks: [
            {
              id: 6,
              name: 'Glucose Tolerance Test',
              category: 'GDM Monitoring',
              problem: 'Gestational Diabetes Management',
              sequence: 6,
            },
            {
              id: 7,
              name: 'HbA1c Monitoring',
              category: 'GDM Monitoring',
              problem: 'Gestational Diabetes Management',
              sequence: 7,
            },
            {
              id: 8,
              name: 'Genetic Screening',
              category: 'GDM Monitoring',
              problem: 'Gestational Diabetes Management',
              sequence: 8,
              note: 'Also in Routine Labs',
            },
          ],
        },
      ],
    },
  ];

  protected readonly filteredGroups = computed(() => {
    const query = this.query().trim().toLowerCase();
    if (!query) return this.groups;

    return this.groups
      .map((problem) => {
        const problemMatches = problem.name.toLowerCase().includes(query);
        const categories = problem.categories
          .map((category) => {
            const categoryMatches = category.name.toLowerCase().includes(query);
            const tasks =
              problemMatches || categoryMatches
                ? category.tasks
                : category.tasks.filter((task) => task.name.toLowerCase().includes(query));
            return { ...category, tasks };
          })
          .filter((category) => category.tasks.length);
        return { ...problem, categories };
      })
      .filter((problem) => problem.categories.length);
  });

  protected toggleProblem(problemId: number): void {
    this.toggleExpanded(this.expandedProblemIds, problemId);
  }

  protected toggleCategory(categoryId: number): void {
    this.toggleExpanded(this.expandedCategoryIds, categoryId);
  }

  protected toggleTask(taskId: number): void {
    this.selectedIds.update((selected) => {
      const next = new Set(selected);
      next.has(taskId) ? next.delete(taskId) : next.add(taskId);
      return next;
    });
  }

  protected clearSelection(): void {
    this.selectedIds.set(new Set());
  }

  protected clearQuery(): void {
    this.query.set('');
  }

  protected associate(): void {
    this.ref.close(this.allTasks().filter((task) => this.selectedIds().has(task.id)));
  }

  private allTasks(): TaskOption[] {
    return this.groups.flatMap((problem) =>
      problem.categories.flatMap((category) => category.tasks),
    );
  }

  private toggleExpanded(target: typeof this.expandedProblemIds, id: number): void {
    target.update((expanded) => {
      const next = new Set(expanded);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
}
