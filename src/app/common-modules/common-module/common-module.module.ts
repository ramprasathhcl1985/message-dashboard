import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModuleRoutingModule } from './common-module-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login/user-login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UserRegisterComponent,
    UserLoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    CommonModuleRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    UserRegisterComponent,
    PageNotFoundComponent
  ]
})
export class CommonModuleModule { }
