import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IUsers } from '../../../models/users';
import { UserApiService } from './services/user-api.service';
import { ApplicationConstants } from '../../../constants/applicationConstant';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  /* to prepare user registeration form */
  public userRegisterForm: FormGroup;

  public userName = new FormControl('', [Validators.required]);
  public userEmail = new FormControl('', [Validators.required, Validators.email]);
  public userPassword = new FormControl('', [Validators.required]);
  public userConfirmPassword = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder, private addUserService: UserApiService, private router: Router) {

    this.userRegisterForm = this.fb.group({
      userName: this.userName,
      userEmail: this.userEmail,
      userPassword: this.userPassword,
      userConfirmPassword: this.userConfirmPassword,

    });
  }

  ngOnInit() {

  }

  /* to add new used to database  */

  public onSubmit(): void {
    if (this.userRegisterForm.valid) {
      const userAdd: IUsers = {
        userName: this.userName.value,
        userEmail: this.userEmail.value,
        userPassword: this.userConfirmPassword.value
      };
      this.addUserService.addUser(userAdd).subscribe((success) => {
        this.addUserService.setSessionItem(ApplicationConstants.userLoginId, success.id.toString());
        this.router.navigateByUrl('/login');

      });

    } else {
      Object.keys(this.userRegisterForm.controls).forEach(key => {
        this.userRegisterForm.controls[key].markAsDirty();

      });
    }

  }
  /* method to redirect to login page */

  public goToLogin() {
    this.router.navigateByUrl('/login');
  }


}
