import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

type TaskStatus = 'Active' | 'Draft' | 'Pending' | 'Inactive';

interface TaskSummary {
  label: string;
  value: number;
}

interface TaskTemplate {
  id: number;
  name: string;
  orders: number;
  status: TaskStatus;
  modified: string;
}

@Component({
  selector: 'app-task-library',
  templateUrl: './task-library.html',
  styleUrl: './task-library.scss',
  imports: [FormsModule, MatButton, MatSelectModule, MatTooltipModule, RouterLink],
})
export class TaskLibrary {
  protected readonly query = signal('');
  protected readonly status = signal<TaskStatus | ''>('');

  protected readonly tasks = signal<TaskTemplate[]>([
    {
      id: 1,
      name: 'Routine Prenatal Care',
      orders: 5,
      status: 'Active',
      modified: '2024-05-10',
    },
    {
      id: 2,
      name: 'Gestational Diabetes Mellitus',
      orders: 4,
      status: 'Active',
      modified: '2024-04-22',
    },
    {
      id: 3,
      name: 'Chronic Hypertension',
      orders: 3,
      status: 'Draft',
      modified: '2024-03-15',
    },
    {
      id: 4,
      name: 'Anemia in Pregnancy',
      orders: 2,
      status: 'Pending',
      modified: '2024-06-01',
    },
    {
      id: 5,
      name: 'Obesity in Pregnancy',
      orders: 3,
      status: 'Pending',
      modified: '2024-02-28',
    },
  ]);

  protected readonly stats = computed<TaskSummary[]>(() => [
    { label: 'Total Task', value: 47 },
    { label: 'Active Task', value: 38 },
    { label: 'Draft Task', value: 6 },
    { label: 'Inactive Task', value: 3 },
  ]);

  protected readonly filtered = computed(() => {
    const query = this.query().trim().toLowerCase();
    const status = this.status();

    return this.tasks().filter((task) => {
      const matchesQuery = !query || task.name.toLowerCase().includes(query);
      const matchesStatus = !status || task.status === status;

      return matchesQuery && matchesStatus;
    });
  });
}
