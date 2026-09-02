import { Routes } from '@angular/router';
import { institutionAdminProfileGuard } from './institution-admin-profile.guard';

export const INSTITUTION_ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../layout/institution-admin-layout/institution-admin-layout').then(
        (m) => m.InstitutionAdminLayout,
      ),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'profile-setup' },
      {
        path: 'profile-setup',
        loadComponent: () => import('./profile-setup/profile-setup').then((m) => m.ProfileSetup),
      },
      {
        path: 'dashboard',
        canActivate: [institutionAdminProfileGuard],
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.InstitutionDashboard),
      },
    ],
  },
];
