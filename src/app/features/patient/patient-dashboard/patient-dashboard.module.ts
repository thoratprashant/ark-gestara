import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';

import { PatientDashboard } from './patient-dashboard';
import { AddProblemDialog } from './add-problem-dialog/add-problem-dialog';
import { TimelineItemDialog } from './timeline-item-dialog/timeline-item-dialog';

const routes: Routes = [
  {
    path: '',
    component: PatientDashboard,
  },
];

@NgModule({
  declarations: [AddProblemDialog, PatientDashboard, TimelineItemDialog],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class PatientDashboardModule {}
