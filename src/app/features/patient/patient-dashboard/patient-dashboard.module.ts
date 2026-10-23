import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { SuggestiveInput } from '../../../shared/components/suggestive-input/suggestive-input';

import { PatientDashboard } from './patient-dashboard';
import { AddProblemDialog } from './add-problem-dialog/add-problem-dialog';
import { AssignProblemDialog } from './assign-problem-dialog/assign-problem-dialog';
import { TimelineItemDialog } from './timeline-item-dialog/timeline-item-dialog';

const routes: Routes = [
  {
    path: '',
    component: PatientDashboard,
  },
];

@NgModule({
  declarations: [AddProblemDialog, AssignProblemDialog, PatientDashboard, TimelineItemDialog],
  imports: [
    CommonModule,
    DragDropModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SuggestiveInput,
  ],
})
export class PatientDashboardModule {}
