import { DOCUMENT } from '@angular/common';
import { Component, NgZone, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from './shared/components/loader/loader';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly ngZone = inject(NgZone);
  private readonly removeInputListener: () => void;
  private readonly removeChangeListener: () => void;

  protected readonly loader = inject(LoaderService);

  constructor() {
    this.removeInputListener = this.listenForValueCasing('input');
    this.removeChangeListener = this.listenForValueCasing('change');
  }

  ngOnDestroy(): void {
    this.removeInputListener();
    this.removeChangeListener();
  }

  private listenForValueCasing(eventName: 'change' | 'input'): () => void {
    const handler = (event: Event) => this.normalizeFieldValue(event);

    this.ngZone.runOutsideAngular(() => {
      this.document.addEventListener(eventName, handler, true);
    });

    return () => this.document.removeEventListener(eventName, handler, true);
  }

  private normalizeFieldValue(event: Event): void {
    const field = event.target;

    if (!(field instanceof HTMLInputElement) && !(field instanceof HTMLTextAreaElement)) {
      return;
    }

    if (field instanceof HTMLInputElement && !this.shouldNormalizeInput(field)) {
      return;
    }

    const nextValue =
      field instanceof HTMLInputElement && this.isEmailInput(field)
        ? field.value.toLowerCase()
        : this.capitalizeFirstLetter(field.value);

    if (field.value === nextValue) {
      return;
    }

    const selection = this.readSelection(field);

    field.value = nextValue;

    this.restoreSelection(field, selection);
  }

  private shouldNormalizeInput(input: HTMLInputElement): boolean {
    return ['email', 'search', 'tel', 'text', 'url'].includes(input.type);
  }

  private isEmailInput(input: HTMLInputElement): boolean {
    return (
      input.type === 'email' ||
      [
        input.id,
        input.name,
        input.autocomplete,
        input.getAttribute('formControlName'),
        input.getAttribute('aria-label'),
        input.placeholder,
      ].some((value) => value?.toLowerCase().includes('email'))
    );
  }

  private readSelection(
    field: HTMLInputElement | HTMLTextAreaElement,
  ): { end: number; start: number } | null {
    try {
      return field.selectionStart !== null && field.selectionEnd !== null
        ? { start: field.selectionStart, end: field.selectionEnd }
        : null;
    } catch {
      return null;
    }
  }

  private restoreSelection(
    field: HTMLInputElement | HTMLTextAreaElement,
    selection: { end: number; start: number } | null,
  ): void {
    if (!selection) {
      return;
    }

    try {
      field.setSelectionRange(selection.start, selection.end);
    } catch {
      return;
    }
  }

  private capitalizeFirstLetter(value: string): string {
    const firstLetterIndex = value.search(/[A-Za-z]/);

    if (firstLetterIndex === -1) {
      return value;
    }

    return (
      value.slice(0, firstLetterIndex) +
      value.charAt(firstLetterIndex).toUpperCase() +
      value.slice(firstLetterIndex + 1)
    );
  }
}
