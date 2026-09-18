import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { OrderLibrary } from './order-library';

describe('OrderLibrary', () => {
  let component: OrderLibrary;
  let fixture: ComponentFixture<OrderLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderLibrary],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
