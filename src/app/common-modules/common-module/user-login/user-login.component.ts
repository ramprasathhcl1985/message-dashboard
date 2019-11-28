import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserApiService } from '../user-register/services/user-api.service';
import { IUsers } from '../../../models/users';
import { ApplicationConstants } from '../../../constants/applicationConstant';
import { HeaderService } from '../header/services/header.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  public userLogin: FormGroup;
  public usersList: IUsers[];
  public inValidUserMessage = '';

  public userName = new FormControl('', [Validators.required]);
  public userPassword = new FormControl('', [Validators.required]);


  constructor(private fb: FormBuilder, private router: Router, private userService: UserApiService, private headerService: HeaderService) {
    this.userLogin = this.fb.group({
      userName: this.userName,
      userPassword: this.userPassword
    })
  }

  ngOnInit() {

    /* to get the list of users */

    this.getUsersList();

  }
  /* form submit checking suer login is present in the user List */
  public onSubmit(): void {
    if (this.userLogin.valid) {
      if (this.userService.usersListArr.filter((data) =>  data.userName === this.userName.value && data.userPassword === this.userPassword.value)) {
        this.usersList = this.userService.usersListArr.filter((data) => data.userName === this.userName.value  && data.userPassword === this.userPassword.value);
        if (this.usersList.length > 0) {
          this.inValidUserMessage = '';
          this.userService.setSessionItem(ApplicationConstants.userLoginId, this.usersList[0].id.toString());
          this.headerService.enableMenus.next(true);
          this.headerService.loginUserName.next(this.usersList[0].userName);
          this.router.navigateByUrl('/customer');
        } else {
          this.inValidUserMessage = ApplicationConstants.loginErrorMessage;
        }
      }
    } else {
      Object.keys(this.userLogin.controls).forEach(key => {
        this.userLogin.controls[key].markAsDirty();
      });
    }
  }
  /* method to  get the list of users */
  public getUsersList(): void {
    this.userService.getUsersList().subscribe((data) => {
      this.userService.usersListArr = data;
    });
  }
  /* to redirect to register page*/
  public goToRegister(): void {
    this.router.navigateByUrl('/register');
  }



}
