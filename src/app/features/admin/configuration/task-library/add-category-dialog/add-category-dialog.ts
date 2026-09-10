import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { AssociatedCategory } from '../add-new-task/add-new-task';

interface CategoryOption extends AssociatedCategory {
  problemId: number;
}

interface ProblemGroup {
  id: number;
  name: string;
  categories: CategoryOption[];
}

export const ADD_CATEGORY_DIALOG_CONFIG = {
  width: '580px',
  maxWidth: 'calc(100vw - 32px)',
  maxHeight: 'calc(100dvh - 32px)',
  panelClass: 'task-category-dialog-panel',
  autoFocus: false,
  restoreFocus: true,
  ariaLabelledBy: 'add-category-dialog-title',
};

@Component({
  selector: 'app-add-category-dialog',
  imports: [FormsModule, MatButton, MatDialogModule, MatTooltipModule],
  templateUrl: './add-category-dialog.html',
  styleUrl: './add-category-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCategoryDialog {
  private readonly ref =
    inject<MatDialogRef<AddCategoryDialog, AssociatedCategory[]>>(MatDialogRef);
  private readonly current = inject<AssociatedCategory[]>(MAT_DIALOG_DATA);

  protected readonly query = signal('');
  protected readonly selectedIds = signal(new Set(this.current.map((category) => category.id)));
  protected readonly expandedIds = signal(new Set([1, 2]));

  protected readonly groups: ProblemGroup[] = [
    {
      id: 1,
      name: 'Routine Prenatal Care',
      categories: [
        {
          id: 1,
          problemId: 1,
          categoryName: 'Routine Labs',
          problemName: 'Routine Prenatal Care',
          status: 'Active',
        },
        {
          id: 2,
          problemId: 1,
          categoryName: 'Imaging',
          problemName: 'Routine Prenatal Care',
          status: 'Active',
        },
      ],
    },
    {
      id: 2,
      name: 'Gestational Diabetes Management',
      categories: [
        {
          id: 3,
          problemId: 2,
          categoryName: 'GDM Monitoring',
          problemName: 'Gestational Diabetes Management',
          status: 'Active',
        },
        {
          id: 4,
          problemId: 2,
          categoryName: 'Nutrition Counseling',
          problemName: 'Gestational Diabetes Management',
          status: 'Active',
        },
      ],
    },
    {
      id: 3,
      name: 'Postpartum Care',
      categories: [
        {
          id: 5,
          problemId: 3,
          categoryName: 'Postpartum Follow Up',
          problemName: 'Postpartum Care',
          status: 'Draft',
        },
      ],
    },
  ];

  protected readonly filteredGroups = computed(() => {
    const query = this.query().trim().toLowerCase();

    if (!query) return this.groups;

    return this.groups
      .map((group) => ({
        ...group,
        categories: group.categories.filter(
          (category) =>
            category.categoryName.toLowerCase().includes(query) ||
            category.problemName.toLowerCase().includes(query),
        ),
      }))
      .filter((group) => group.name.toLowerCase().includes(query) || group.categories.length);
  });

  protected toggleGroup(groupId: number): void {
    this.expandedIds.update((ids) => {
      const next = new Set(ids);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  }

  protected toggle(category: AssociatedCategory): void {
    this.selectedIds.update((selected) => {
      const next = new Set(selected);
      if (next.has(category.id)) {
        next.delete(category.id);
      } else {
        next.add(category.id);
      }
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
    const selected = this.groups
      .flatMap((group) => group.categories)
      .filter((category) => this.selectedIds().has(category.id))
      .map(({ problemId, ...category }) => category);

    this.ref.close(selected);
  }
}
