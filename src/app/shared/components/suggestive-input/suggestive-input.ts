import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
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
export class SuggestiveInput implements ControlValueAccessor {
  @Input({ required: true }) inputId = '';
  @Input() placeholder = '';
  @Input() options: SuggestiveOption[] = [];

  value = '';
  disabled = false;
  isOpen = false;
  activeIndex = -1;
  filteredOptions: SuggestiveOption[] = [];

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
  }

  handleFocus(): void {
    this.filterOptions();
    this.isOpen = this.filteredOptions.length > 0;
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
  }

  optionId(index: number): string {
    return `${this.inputId}-option-${index}`;
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
}
