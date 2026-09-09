import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { ProblemTemplates } from './problem-templates';
import { SuggestiveInput } from '../../../../../shared/components/suggestive-input/suggestive-input';

class TemplateHarness extends ProblemTemplates {
  readonly state = {
    icds: this.icds,
    categories: this.categories,
    tasks: this.tasks,
    orders: this.orders,
    options: this.icdOptions,
    categoryOptions: this.categoryOptions,
    available: this.availableIcds,
    error: this.sequenceError,
  };
  addCode = this.addIcd.bind(this);
  removeCode = this.removeIcd.bind(this);
  addGroup = this.addCategory.bind(this);
  moveGroup = this.changeSequence.bind(this);
}
describe('Problem template selections', () => {
  const create = () => {
    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: new ElementRef(document.createElement('div')) }],
    });
    return TestBed.runInInjectionContext(() => new TemplateHarness());
  };
  it('adds unique ICDs, excludes selected suggestions, and restores removed choices', () => {
    const page = create();
    const code = page.state.options[0];
    page.addCode(code);
    page.addCode(code);
    expect(page.state.icds()).toHaveLength(1);
    expect(page.state.available()).not.toContain(code);
    page.removeCode(code.value);
    expect(page.state.available()).toContain(code);
  });
  it('supports more than five selections and derives workflow totals', () => {
    const page = create();
    page.state.options.slice(0, 6).forEach(page.addCode);
    page.state.categoryOptions.slice(0, 6).forEach(page.addGroup);
    expect(page.state.icds()).toHaveLength(6);
    expect(page.state.categories()).toHaveLength(6);
    expect(page.state.tasks()).toBe(47);
    expect(page.state.orders()).toBe(19);
  });
  it('moves a category to the requested position and rejects invalid sequence values', () => {
    const page = create();
    page.state.categoryOptions.slice(0, 3).forEach(page.addGroup);
    const input = document.createElement('input');
    input.value = '1';
    const id = page.state.categoryOptions[2].value;
    page.moveGroup(id, { target: input } as unknown as Event);
    expect(page.state.categories()[0].value).toBe(id);
    expect(page.state.categories().map((item) => item.sequence)).toEqual([1, 2, 3]);
    input.value = '0';
    page.moveGroup(id, { target: input } as unknown as Event);
    expect(page.state.error()).toContain('1 to 3');
    expect(page.state.categories()[0].sequence).toBe(1);
  });
  it('emits selection only on choosing a suggestion and preserves the value accessor', () => {
    const input = new SuggestiveInput();
    const values: string[] = [];
    const selections: string[] = [];
    input.options = [{ value: 'O13.1', label: 'First trimester' }];
    input.registerOnChange((value) => values.push(value));
    input.optionSelected.subscribe((option) => selections.push(option.value));
    input.handleInput({ target: { value: 'O13' } } as unknown as Event);
    expect(selections).toEqual([]);
    input.handleKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    input.handleKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(values).toEqual(['O13', 'O13.1']);
    expect(selections).toEqual(['O13.1']);
    expect(input.isOpen).toBe(false);
  });
});
