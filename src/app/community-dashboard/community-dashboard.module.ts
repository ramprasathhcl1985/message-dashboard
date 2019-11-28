import { NgModule } from '@angular/core';
import { CommunityDashboardRoutingModule } from './community-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModuleModule } from '../common-modules/common-module/common-module.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AccordionModule} from 'primeng/accordion';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommunityDashboardRoutingModule,
    CommonModuleModule,
    CommonModule,
    FormsModule,
    AccordionModule

  ]
})
export class CommunityDashboardModule { }
