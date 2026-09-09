import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  afterNextRender,
  ElementRef,
  DestroyRef,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import {
  SuggestiveInput,
  SuggestiveOption,
} from '../../../../../shared/components/suggestive-input/suggestive-input';

interface Category extends SuggestiveOption {
  tasks: number;
  orders: number;
  sequence: number;
}
@Component({
  selector: 'app-problem-templates',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    RouterLink,
    SuggestiveInput,
  ],
  templateUrl: './problem-templates.html',
  styleUrl: './problem-templates.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemTemplates {
  private readonly fb = inject(FormBuilder);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const table = entry.target as HTMLTableElement;
          const rows = Array.from(table.tBodies[0]?.rows ?? []);
          const container = table.parentElement;
          if (container) {
            const height =
              (table.tHead?.getBoundingClientRect().height ?? 0) +
              rows
                .slice(0, 5)
                .reduce((total, row) => total + row.getBoundingClientRect().height, 0) +
              2;
            container.style.maxHeight = rows.length > 5 ? Math.ceil(height) + 'px' : 'none';
          }
        }
      });
      this.host.nativeElement.querySelectorAll('table').forEach((table) => observer.observe(table));
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.pattern(/\S/)]],
    classification: [''],
    sequence: [1, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
    description: [''],
    status: ['Draft'],
  });
  protected readonly icdSearch = new FormControl('', { nonNullable: true });
  protected readonly categorySearch = new FormControl('', { nonNullable: true });
  protected readonly classifications = ['Obstetric', 'Medical', 'Surgical', 'Psychosocial'];
  // Design examples only; the ICD master API can supply this catalog when connected.
  protected readonly icdOptions: SuggestiveOption[] = [
    ...[
      ['O13.1', 'first trimester', '1st'],
      ['O13.2', 'second trimester', '2nd'],
      ['O13.3', 'third trimester', '3rd'],
      ['O13.4', 'complicating childbirth', 'N/A'],
      ['O13.5', 'complicating the puerperium', 'N/A'],
      ['O13.9', 'unspecified trimester', 'Unspecified'],
    ].map(([value, suffix, description]) => ({
      value,
      label: `Gestational [pregnancy-induced] hypertension without significant proteinuria, ${suffix}`,
      description,
    })),
    {
      value: 'O14.00',
      label: 'Mild to moderate pre-eclampsia, unspecified trimester',
      description: 'Unspecified',
    },
    {
      value: 'O14.02',
      label: 'Mild to moderate pre-eclampsia, second trimester',
      description: '2nd',
    },
    {
      value: 'O14.03',
      label: 'Mild to moderate pre-eclampsia, third trimester',
      description: '3rd',
    },
    {
      value: 'O14.10',
      label: 'Severe pre-eclampsia, unspecified trimester',
      description: 'Unspecified',
    },
  ];
  protected readonly categoryOptions: Category[] = [
    ['Prenatal Cardiovascular Monitoring', 8, 3],
    ['High-Risk Pregnancy Protocols', 12, 5],
    ['Gestational Diabetes Management', 9, 4],
    ['Postpartum Recovery Protocols', 6, 2],
    ['Fetal Growth Monitoring', 5, 2],
    ['Labor & Delivery Procedures', 7, 3],
    ['Maternal Mental Health Screening', 4, 1],
    ['Neonatal Care Pathways', 6, 2],
  ].map(([label, tasks, orders], index) => ({
    value: `category-${index + 1}`,
    label: String(label),
    tasks: Number(tasks),
    orders: Number(orders),
    sequence: index + 1,
  }));
  protected readonly icds = signal<SuggestiveOption[]>([]);
  protected readonly categories = signal<Category[]>([]);
  protected readonly availableIcds = computed(() =>
    this.icdOptions.filter((item) => !this.icds().some((row) => row.value === item.value)),
  );
  protected readonly availableCategories = computed(() =>
    this.categoryOptions.filter(
      (item) => !this.categories().some((row) => row.value === item.value),
    ),
  );
  protected readonly tasks = computed(() =>
    this.categories().reduce((total, item) => total + item.tasks, 0),
  );
  protected readonly orders = computed(() =>
    this.categories().reduce((total, item) => total + item.orders, 0),
  );
  protected readonly message = signal('');
  protected readonly sequenceError = signal('');
  protected addIcd(option: SuggestiveOption): void {
    if (!this.icds().some((item) => item.value === option.value))
      this.icds.update((items) => [...items, option]);
    this.icdSearch.setValue('');
    this.message.set('');
  }
  protected removeIcd(value: string): void {
    this.icds.update((items) => items.filter((item) => item.value !== value));
  }
  protected addCategory(option: SuggestiveOption): void {
    const category = this.categoryOptions.find((item) => item.value === option.value);
    if (category && !this.categories().some((item) => item.value === option.value)) {
      this.categories.update((items) => [...items, { ...category, sequence: items.length + 1 }]);
    }
    this.categorySearch.setValue('');
    this.message.set('');
  }
  protected removeCategory(value: string): void {
    this.categories.update((items) =>
      items
        .filter((item) => item.value !== value)
        .map((item, index) => ({ ...item, sequence: index + 1 })),
    );
  }
  protected changeSequence(value: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const sequence = Number(input.value);
    if (!Number.isInteger(sequence) || sequence < 1 || sequence > this.categories().length) {
      this.sequenceError.set(`Enter a sequence from 1 to ${this.categories().length}.`);
      input.value = String(this.categories().find((item) => item.value === value)?.sequence);
      return;
    }
    this.sequenceError.set('');
    const items = [...this.categories()];
    const index = items.findIndex((item) => item.value === value);
    const [item] = items.splice(index, 1);
    items.splice(sequence - 1, 0, item);
    this.categories.set(items.map((row, i) => ({ ...row, sequence: i + 1 })));
  }
  protected focusIcd(): void {
    document.getElementById('icd-search')?.focus();
  }
  protected save(draft = false): void {
    this.message.set('');
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      document
        .getElementById(this.form.controls.name.invalid ? 'problem-name' : 'display-sequence')
        ?.focus();
      return;
    }
    if (draft) this.form.controls.status.setValue('Draft');
    const record = {
      ...this.form.getRawValue(),
      name: this.form.controls.name.value.trim(),
      icds: this.icds(),
      categories: this.categories(),
    };
    try {
      localStorage.setItem('gestara.problem-template', JSON.stringify(record));
      this.message.set(draft ? 'Draft saved in this browser.' : 'Template saved in this browser.');
    } catch {
      this.message.set(
        'Unable to save in this browser. Your entries are still available on this page.',
      );
    }
  }
}
