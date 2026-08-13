import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'patient',
    loadChildren: () => import('./features/patient/patient.routes').then((m) => m.PATIENT_ROUTES),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'patient/dashboard',
  },
  {
    path: '**',
    redirectTo: 'patient/dashboard',
  },
];
