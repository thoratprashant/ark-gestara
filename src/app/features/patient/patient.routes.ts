import { Routes } from '@angular/router';

import { PatientLayout } from '../../layout/patient-layout/patient-layout';

export const PATIENT_ROUTES: Routes = [
  {
    path: '',
    component: PatientLayout,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./patient-dashboard/patient-dashboard.module').then(
            (m) => m.PatientDashboardModule,
          ),
      },
      {
        path: 'previous-visits',
        loadComponent: () =>
          import('./previous-visits/previous-visits').then((m) => m.PreviousVisits),
      },
      {
        path: 'future-visits',
        loadComponent: () => import('./future-visits/future-visits').then((m) => m.FutureVisits),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: '**',
        loadComponent: () =>
          import('../../pages/page-not-found/page-not-found').then((m) => m.PageNotFound),
      },
    ],
  },
];
