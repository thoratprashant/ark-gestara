import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientDashboard } from './patient-dashboard';

const routes: Routes = [
  {
    path: '',
    component: PatientDashboard,
  },
];

@NgModule({
  declarations: [PatientDashboard],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PatientDashboardModule {}
