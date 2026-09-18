import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AddNewOrder } from './add-new-order';

describe('AddNewOrder', () => {
  let component: AddNewOrder;
  let fixture: ComponentFixture<AddNewOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewOrder],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
