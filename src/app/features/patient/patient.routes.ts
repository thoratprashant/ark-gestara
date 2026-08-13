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
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
];
