import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { describe, expect, it, vi } from 'vitest';
import { InstitutionAdminProfileState } from './institution-admin-profile-state';
import { institutionAdminProfileGuard } from './institution-admin-profile.guard';

describe('institutionAdminProfileGuard', () => {
  it('redirects Dashboard to Profile Setup while the profile is incomplete', () => {
    const redirect = {} as UrlTree;
    const createUrlTree = vi.fn(() => redirect);

    TestBed.configureTestingModule({
      providers: [InstitutionAdminProfileState, { provide: Router, useValue: { createUrlTree } }],
    });

    const result = TestBed.runInInjectionContext(() =>
      institutionAdminProfileGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );

    expect(result).toBe(redirect);
    expect(createUrlTree).toHaveBeenCalledWith(['/institution-admin', 'profile-setup']);
  });

  it('allows Dashboard after profile completion', () => {
    TestBed.configureTestingModule({
      providers: [InstitutionAdminProfileState, { provide: Router, useValue: {} }],
    });
    TestBed.inject(InstitutionAdminProfileState).completeProfile();

    const result = TestBed.runInInjectionContext(() =>
      institutionAdminProfileGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );

    expect(result).toBe(true);
  });
});
