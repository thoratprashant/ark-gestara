import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SuggestiveOption {
  value: string;
  label: string;
  description?: string;
}

@Component({
  selector: 'app-suggestive-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggestive-input.html',
  styleUrl: './suggestive-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SuggestiveInput),
      multi: true,
    },
  ],
})
export class SuggestiveInput implements ControlValueAccessor, OnDestroy {
  @Input({ required: true }) inputId = '';
  @Input() placeholder = '';
  @Input() iconSrc = '';
  @Input() dropdownPlacement: 'auto' | 'above' | 'below' = 'auto';
  private listObserver?: ResizeObserver;
  private suggestionsElement?: HTMLElement;

  @ViewChild('suggestions') set suggestions(ref: ElementRef<HTMLElement> | undefined) {
    this.listObserver?.disconnect();
    this.suggestionsElement = ref?.nativeElement;
    if (!ref) return;
    const list = ref.nativeElement;
    const measure = () => {
      const rows = Array.from(list.querySelectorAll<HTMLElement>('.suggestive-input__option'));
      const style = getComputedStyle(list);
      const spacing =
        parseFloat(style.paddingTop) +
        parseFloat(style.paddingBottom) +
        parseFloat(style.borderTopWidth) +
        parseFloat(style.borderBottomWidth);
      list.style.maxHeight =
        rows.length > 7
          ? Math.ceil(
              rows
                .slice(0, 7)
                .reduce((height, row) => height + row.getBoundingClientRect().height, 0) + spacing,
            ) + 'px'
          : 'none';
      this.updateDropdownPlacement(list);
    };
    this.listObserver = new ResizeObserver(measure);
    this.listObserver.observe(list);
    list
      .querySelectorAll('.suggestive-input__option')
      .forEach((row) => this.listObserver!.observe(row));
  }

  ngOnDestroy(): void {
    this.listObserver?.disconnect();
  }
  @Input() options: SuggestiveOption[] = [];
  @Input() optionTemplate?: TemplateRef<{ $implicit: SuggestiveOption }>;
  @Output() optionSelected = new EventEmitter<SuggestiveOption>();

  value = '';
  disabled = false;
  isOpen = false;
  activeIndex = -1;
  filteredOptions: SuggestiveOption[] = [];
  opensAbove = false;

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: string | null): void {
    this.value = value ?? '';
    this.filterOptions();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  handleInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
    this.filterOptions();
    this.isOpen = this.filteredOptions.length > 0;
    this.activeIndex = -1;
    queueMicrotask(() => this.updateDropdownPlacement());
  }

  handleFocus(): void {
    if (this.disabled) return;
    this.filterOptions();
    this.isOpen = this.filteredOptions.length > 0;
    queueMicrotask(() => this.updateDropdownPlacement());
  }

  handleBlur(): void {
    this.onTouched();
    this.isOpen = false;
    this.activeIndex = -1;
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.isOpen = false;
      this.activeIndex = -1;
      return;
    }

    if (!this.isOpen || this.filteredOptions.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex = (this.activeIndex + 1) % this.filteredOptions.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex =
        (this.activeIndex - 1 + this.filteredOptions.length) % this.filteredOptions.length;
    } else if (event.key === 'Enter' && this.activeIndex >= 0) {
      event.preventDefault();
      this.selectOption(this.filteredOptions[this.activeIndex]);
    }
  }

  selectOption(option: SuggestiveOption): void {
    this.value = option.value;
    this.onChange(option.value);
    this.onTouched();
    this.isOpen = false;
    this.activeIndex = -1;
    this.optionSelected.emit(option);
  }

  optionId(index: number): string {
    return `${this.inputId}-option-${index}`;
  }

  private updateDropdownPlacement(list = this.suggestionsElement): void {
    if (!list) {
      return;
    }

    if (this.dropdownPlacement !== 'auto') {
      this.opensAbove = this.dropdownPlacement === 'above';
      return;
    }

    const host = this.elementRef?.nativeElement;
    const input = host?.querySelector('input');
    const boundary = host?.closest<HTMLElement>('mat-dialog-content');

    if (!input || !boundary) {
      this.opensAbove = false;
      return;
    }

    const inputRect = input.getBoundingClientRect();
    const boundaryRect = boundary.getBoundingClientRect();
    const listHeight = Math.min(list.scrollHeight, 188);
    const spaceBelow = boundaryRect.bottom - inputRect.bottom - 4;
    const spaceAbove = inputRect.top - boundaryRect.top - 4;

    this.opensAbove = spaceBelow < listHeight && spaceAbove > spaceBelow;
  }

  private filterOptions(): void {
    const query = this.value.trim().toLocaleLowerCase();
    this.filteredOptions = this.options.filter((option) => {
      if (!query) {
        return true;
      }

      return `${option.value} ${option.label}`.toLocaleLowerCase().includes(query);
    });
  }

  constructor(private readonly elementRef?: ElementRef<HTMLElement>) {}
}
