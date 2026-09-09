import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

type CategoryStatus = 'Active' | 'Draft' | 'Pending' | 'Inactive';

interface CategorySummary {
  label: string;
  value: number;
}

interface CategoryTemplate {
  id: number;
  name: string;
  tasks: number;
  orders: number;
  status: CategoryStatus;
  modified: string;
}

@Component({
  selector: 'app-category-library',
  templateUrl: './category-library.html',
  styleUrl: './category-library.scss',
  imports: [FormsModule, MatButton, MatSelectModule, MatTooltipModule, RouterLink],
})
export class CategoryLibrary {
  protected readonly query = signal('');
  protected readonly status = signal<CategoryStatus | ''>('');

  protected readonly categories = signal<CategoryTemplate[]>([
    {
      id: 1,
      name: 'Routine Prenatal Care',
      tasks: 12,
      orders: 5,
      status: 'Active',
      modified: '2024-05-10',
    },
    {
      id: 2,
      name: 'Gestational Diabetes Mellitus',
      tasks: 9,
      orders: 4,
      status: 'Active',
      modified: '2024-04-22',
    },
    {
      id: 3,
      name: 'Chronic Hypertension',
      tasks: 7,
      orders: 3,
      status: 'Draft',
      modified: '2024-03-15',
    },
    {
      id: 4,
      name: 'Anemia in Pregnancy',
      tasks: 6,
      orders: 2,
      status: 'Pending',
      modified: '2024-06-01',
    },
    {
      id: 5,
      name: 'Obesity in Pregnancy',
      tasks: 8,
      orders: 3,
      status: 'Pending',
      modified: '2024-02-28',
    },
  ]);

  protected readonly stats = computed<CategorySummary[]>(() => [
    { label: 'Total Category', value: 47 },
    { label: 'Active Category', value: 38 },
    { label: 'Draft Category', value: 6 },
    { label: 'Inactive Category', value: 3 },
  ]);

  protected readonly filtered = computed(() => {
    const query = this.query().trim().toLowerCase();
    const status = this.status();

    return this.categories().filter((category) => {
      const matchesQuery = !query || category.name.toLowerCase().includes(query);
      const matchesStatus = !status || category.status === status;

      return matchesQuery && matchesStatus;
    });
  });
}
