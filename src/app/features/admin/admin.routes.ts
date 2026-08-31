import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../layout/admin-layout/admin-layout').then((m) => m.AdminLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'Dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile').then((m) => m.AdminProfile),
      },
      {
        path: 'institution/institutions/add-institution',
        loadComponent: () =>
          import('./institution/institutions/add-institution/add-institution').then(
            (m) => m.AddInstitution,
          ),
      },
      {
        path: 'institution/institutions',
        loadComponent: () =>
          import('./institution/institutions/institutions').then((m) => m.Institutions),
      },
      {
        path: 'institution/institution-admins/provision-institution-admin/:mode',
        loadComponent: () =>
          import('./institution/institution-admins/provision-institution-admin/provision-institution-admin').then(
            (m) => m.ProvisionInstitutionAdmin,
          ),
      },
      {
        path: 'institution/institution-admins',
        loadComponent: () =>
          import('./institution/institution-admins/institution-admins').then(
            (m) => m.InstitutionAdmins,
          ),
      },
      {
        path: 'institution/providers',
        loadComponent: () => import('./institution/providers/providers').then((m) => m.Providers),
      },
      {
        path: 'configuration/problem-library',
        loadComponent: () =>
          import('./configuration/problem-library/problem-library').then((m) => m.ProblemLibrary),
      },
      {
        path: 'configuration/category-library',
        loadComponent: () =>
          import('./configuration/category-library/category-library').then(
            (m) => m.CategoryLibrary,
          ),
      },
      {
        path: 'configuration/task-library',
        loadComponent: () =>
          import('./configuration/task-library/task-library').then((m) => m.TaskLibrary),
      },
      {
        path: 'clinical-rules/clinical-threshold-config',
        loadComponent: () =>
          import('./clinical-rules/clinical-threshold-config/clinical-threshold-config').then(
            (m) => m.ClinicalThresholdConfig,
          ),
      },
      {
        path: 'clinical-rules/delivery-window-config',
        loadComponent: () =>
          import('./clinical-rules/delivery-window-config/delivery-window-config').then(
            (m) => m.DeliveryWindowConfig,
          ),
      },
    ],
  },
];
