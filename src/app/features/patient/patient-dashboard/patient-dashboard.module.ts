import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
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
  imports: [CommonModule, MatTooltipModule, RouterModule.forChild(routes)],
})
export class PatientDashboardModule {}
