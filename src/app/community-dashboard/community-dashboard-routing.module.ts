import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from '../core-services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent, canActivate : [AuthGuardService]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityDashboardRoutingModule { }
