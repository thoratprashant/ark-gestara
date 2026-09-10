import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import {
  ADD_CATEGORY_DIALOG_CONFIG,
  AddCategoryDialog,
} from '../add-category-dialog/add-category-dialog';

type TaskStatus = 'Draft' | 'Active' | 'Inactive';
type TaskType = 'Order Layout' | 'Checkbox Layout';

export interface AssociatedCategory {
  id: number;
  categoryName: string;
  problemName: string;
  status: TaskStatus;
}

interface AssociatedOrder {
  id: number;
  name: string;
  sequence: number;
  status: 'Active';
}

interface ChecklistItem {
  id: number;
  name: string;
  requiresNotes: boolean;
  sequence: number;
}

@Component({
  selector: 'app-add-new-task',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatTooltipModule,
    RouterLink,
  ],
  templateUrl: './add-new-task.html',
  styleUrl: './add-new-task.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewTask {
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.pattern(/\S/)]],
    description: ['', [Validators.required, Validators.pattern(/\S/)]],
    status: ['Draft' as TaskStatus, Validators.required],
    type: ['Order Layout' as TaskType, Validators.required],
    startWeek: [8, [Validators.required, Validators.min(0)]],
    endWeek: [12, [Validators.required, Validators.min(0)]],
  });

  protected readonly categories = signal<AssociatedCategory[]>([
    { id: 1, categoryName: 'Labs', problemName: 'Routine Prenatal Care', status: 'Active' },
    { id: 2, categoryName: 'Labs', problemName: 'Gestational Diabetes Mellitus', status: 'Active' },
    { id: 3, categoryName: 'Labs', problemName: 'Anemia in Pregnancy', status: 'Active' },
    { id: 4, categoryName: 'Genetic Screening', problemName: 'Routine Prenatal Care', status: 'Draft' },
    { id: 5, categoryName: 'Ultrasounds', problemName: 'Routine Prenatal Care', status: 'Active' },
  ]);

  protected readonly orders = signal<AssociatedOrder[]>([
    { id: 1, name: 'CBC', sequence: 1, status: 'Active' },
    { id: 2, name: 'Hemoglobin', sequence: 2, status: 'Active' },
    { id: 3, name: 'Blood Group', sequence: 3, status: 'Active' },
    { id: 4, name: 'Glucose Tolerance Test', sequence: 3, status: 'Active' },
  ]);

  protected readonly checklistItems = signal<ChecklistItem[]>([
    { id: 1, name: 'Verify Patient Identity', requiresNotes: true, sequence: 1 },
    { id: 2, name: 'Review Medical History', requiresNotes: true, sequence: 2 },
    { id: 3, name: 'Confirm Consent Form Signed', requiresNotes: false, sequence: 3 },
    { id: 4, name: 'Record Vital Signs', requiresNotes: true, sequence: 4 },
  ]);

  protected readonly message = signal('');
  protected readonly statusValue = computed(() => this.form.controls.status.value);

  protected openCategoryDialog(): void {
    const ref = this.dialog.open<
      AddCategoryDialog,
      AssociatedCategory[],
      AssociatedCategory[]
    >(AddCategoryDialog, {
      ...ADD_CATEGORY_DIALOG_CONFIG,
      data: this.categories(),
    });

    ref.afterClosed().subscribe((selected) => {
      if (selected) this.categories.set(selected);
    });
  }

  protected removeCategory(categoryId: number): void {
    this.categories.update((items) => items.filter((item) => item.id !== categoryId));
  }

  protected removeOrder(orderId: number): void {
    this.orders.update((items) => items.filter((item) => item.id !== orderId));
  }

  protected removeChecklistItem(itemId: number): void {
    this.checklistItems.update((items) => items.filter((item) => item.id !== itemId));
  }

  protected toggleNotes(itemId: number): void {
    this.checklistItems.update((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, requiresNotes: !item.requiresNotes } : item,
      ),
    );
  }

  protected save(asDraft = false): void {
    if (asDraft) this.form.controls.status.setValue('Draft');
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.message.set(asDraft ? 'Task template saved as draft.' : 'Task template submitted.');
  }

  protected cancel(): void {
    this.router.navigate(['/admin', 'configuration', 'task-library']);
  }
}
