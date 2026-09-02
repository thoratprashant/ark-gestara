import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { InstitutionAdminProfileState } from './institution-admin-profile-state';

export const institutionAdminProfileGuard: CanActivateFn = () => {
  const profileState = inject(InstitutionAdminProfileState);

  return profileState.profileCompleted()
    ? true
    : inject(Router).createUrlTree(['/institution-admin', 'profile-setup']);
};
