import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InstitutionAdminProfileState {
  private readonly completed = signal(false);

  readonly profileCompleted = this.completed.asReadonly();

  completeProfile(): void {
    this.completed.set(true);
  }
}
