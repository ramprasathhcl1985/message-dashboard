import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegisterComponent } from './common-modules/common-module/user-register/user-register.component';
import { UserLoginComponent } from './common-modules/common-module/user-login/user-login.component';
import { PageNotFoundComponent } from './common-modules/common-module/page-not-found/page-not-found.component';
import { AuthGuardService } from './core-services/auth-guard.service';

const routes: Routes = [
  { path: 'register', component: UserRegisterComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'customer', loadChildren: () => import('./community-dashboard/community-dashboard.module').then(m => m.CommunityDashboardModule), canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
