import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

type OrderStatus = 'Active' | 'Draft' | 'Pending' | 'Inactive';

interface OrderSummary {
  label: string;
  value: number;
}

interface OrderTemplate {
  id: number;
  name: string;
  status: OrderStatus;
  modified: string;
}

@Component({
  selector: 'app-order-library',
  imports: [FormsModule, MatButton, MatSelectModule, MatTooltipModule, RouterLink],
  templateUrl: './order-library.html',
  styleUrl: './order-library.scss',
})
export class OrderLibrary {
  protected readonly query = signal('');
  protected readonly status = signal<OrderStatus | ''>('');

  protected readonly orders = signal<OrderTemplate[]>([
    {
      id: 1,
      name: 'Routine Prenatal Care',
      status: 'Active',
      modified: '2024-05-10',
    },
    {
      id: 2,
      name: 'Gestational Diabetes Mellitus',
      status: 'Active',
      modified: '2024-04-22',
    },
    {
      id: 3,
      name: 'Chronic Hypertension',
      status: 'Draft',
      modified: '2024-03-15',
    },
    {
      id: 4,
      name: 'Anemia in Pregnancy',
      status: 'Pending',
      modified: '2024-06-01',
    },
    {
      id: 5,
      name: 'Obesity in Pregnancy',
      status: 'Pending',
      modified: '2024-02-28',
    },
  ]);

  protected readonly stats = computed<OrderSummary[]>(() => [
    { label: 'Total Order', value: 47 },
    { label: 'Active Order', value: 38 },
    { label: 'Draft Order', value: 6 },
    { label: 'Inactive Order', value: 3 },
  ]);

  protected readonly filtered = computed(() => {
    const query = this.query().trim().toLowerCase();
    const status = this.status();

    return this.orders().filter((order) => {
      const matchesQuery = !query || order.name.toLowerCase().includes(query);
      const matchesStatus = !status || order.status === status;

      return matchesQuery && matchesStatus;
    });
  });
}
