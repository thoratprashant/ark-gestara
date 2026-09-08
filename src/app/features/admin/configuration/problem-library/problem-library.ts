import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

interface Problem {
  id: number;
  name: string;
  icds: number;
  categories: number;
  tasks: number;
  orders: number;
  status: string;
  modified: string;
}

@Component({
  imports: [FormsModule, MatButton, MatSelectModule, RouterLink],
  selector: 'app-problem-library',
  templateUrl: './problem-library.html',
  styleUrl: './problem-library.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemLibrary {
  protected readonly query = signal('');
  protected readonly status = signal('');
  protected readonly problems = signal<Problem[]>([
    {
      id: 1,
      name: 'Routine Prenatal Care',
      icds: 4,
      categories: 3,
      tasks: 12,
      orders: 5,
      status: 'Active',
      modified: '2024-05-10',
    },
    {
      id: 2,
      name: 'Gestational Diabetes Mellitus',
      icds: 6,
      categories: 2,
      tasks: 9,
      orders: 4,
      status: 'Active',
      modified: '2024-04-22',
    },
    {
      id: 3,
      name: 'Chronic Hypertension',
      icds: 5,
      categories: 2,
      tasks: 7,
      orders: 3,
      status: 'Draft',
      modified: '2024-03-15',
    },
    {
      id: 4,
      name: 'Anemia in Pregnancy',
      icds: 3,
      categories: 1,
      tasks: 6,
      orders: 2,
      status: 'Pending',
      modified: '2024-06-01',
    },
    {
      id: 5,
      name: 'Obesity in Pregnancy',
      icds: 4,
      categories: 2,
      tasks: 8,
      orders: 3,
      status: 'Pending',
      modified: '2024-02-28',
    },
  ]);
  protected readonly filtered = computed(() =>
    this.problems().filter(
      (problem) =>
        problem.name.toLowerCase().includes(this.query().trim().toLowerCase()) &&
        (!this.status() || problem.status === this.status()),
    ),
  );
  protected readonly stats = [
    { value: 47, label: 'Total Problems' },
    { value: 38, label: 'Active Problems' },
    { value: 6, label: 'Draft Problems' },
    { value: 3, label: 'Inactive Problems' },
  ];
  protected draft: Problem = this.emptyProblem();
  protected mode: 'add' | 'edit' | 'view' = 'add';
  protected open(
    dialog: HTMLDialogElement,
    mode: 'add' | 'edit' | 'view',
    problem?: Problem,
  ): void {
    this.mode = mode;
    this.draft = problem ? { ...problem } : this.emptyProblem();
    dialog.showModal();
  }
  protected save(dialog: HTMLDialogElement): void {
    if (!this.draft.name.trim()) return;
    const problem = {
      ...this.draft,
      name: this.draft.name.trim(),
      modified: new Date().toISOString().slice(0, 10),
    };
    this.problems.update((items) =>
      this.mode === 'add'
        ? [...items, { ...problem, id: Math.max(...items.map((item) => item.id), 0) + 1 }]
        : items.map((item) => (item.id === problem.id ? problem : item)),
    );
    dialog.close();
  }
  private emptyProblem(): Problem {
    return {
      id: 0,
      name: '',
      icds: 0,
      categories: 0,
      tasks: 0,
      orders: 0,
      status: 'Draft',
      modified: '',
    };
  }
}
