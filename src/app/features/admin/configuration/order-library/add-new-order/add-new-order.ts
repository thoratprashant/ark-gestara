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
  ASSOCIATE_ORDER_TASK_DIALOG_CONFIG,
  AssociateOrderTaskDialog,
} from './associate-order-task-dialog/associate-order-task-dialog';
import { OrderTaskAssociation } from './order-task-association.model';

type OrderTemplateStatus = 'Draft' | 'Active' | 'Inactive';

@Component({
  selector: 'app-add-new-order',
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
  templateUrl: './add-new-order.html',
  styleUrl: './add-new-order.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewOrder {
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.pattern(/\S/)]],
    description: ['', [Validators.required, Validators.pattern(/\S/)]],
    status: ['Draft' as OrderTemplateStatus, Validators.required],
    epicCode: [''],
  });

  protected readonly tasks = signal<OrderTaskAssociation[]>([
    {
      id: 1,
      name: 'First Trimester Labs',
      category: 'Routine Labs',
      problem: 'Routine Prenatal Care',
      sequence: 1,
    },
    {
      id: 2,
      name: 'Genetic Screening',
      category: 'GDM Monitoring',
      problem: 'Routine Prenatal Care',
      sequence: 2,
    },
    {
      id: 3,
      name: 'Third Trimester Labs',
      category: 'Routine Labs',
      problem: 'Routine Prenatal Care',
      sequence: 3,
    },
  ]);

  protected readonly message = signal('');
  protected readonly statusValue = computed(() => this.form.controls.status.value);
  protected readonly dependencySummary = {
    tasks: 4,
    categories: 3,
    problems: 3,
  } as const;

  protected openTaskDialog(): void {
    const ref = this.dialog.open<
      AssociateOrderTaskDialog,
      OrderTaskAssociation[],
      OrderTaskAssociation[]
    >(AssociateOrderTaskDialog, {
      ...ASSOCIATE_ORDER_TASK_DIALOG_CONFIG,
      data: this.tasks(),
    });

    ref.afterClosed().subscribe((selected) => {
      if (selected) {
        this.tasks.set(
          selected.map((task, index) => ({
            ...task,
            sequence: this.tasks().find((current) => current.id === task.id)?.sequence ?? index + 1,
          })),
        );
      }
    });
  }

  protected updateSequence(taskId: number, event: Event): void {
    const sequence = Number((event.target as HTMLInputElement).value);
    if (!Number.isInteger(sequence) || sequence < 1) return;

    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, sequence } : task)),
    );
  }

  protected removeTask(taskId: number): void {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
  }

  protected save(asDraft = false): void {
    if (asDraft) this.form.controls.status.setValue('Draft');
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.message.set(asDraft ? 'Order template saved as draft.' : 'Order template submitted.');
  }

  protected cancel(): void {
    this.router.navigate(['/admin', 'configuration', 'order-library']);
  }
}
