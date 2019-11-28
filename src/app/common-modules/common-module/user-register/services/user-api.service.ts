import { Injectable } from '@angular/core';
import { IUsers } from '../../../../models/users';
import { Observable } from 'rxjs';
import { RestService } from '../../../../core-services/rest.service';
import { ApplicationConstants } from '../../../../constants/applicationConstant';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  public usersListArr: IUsers[] ;

  constructor(private userAddService: RestService<IUsers>, private userListService: RestService<IUsers[]>) { }
    /* to get the list of  users from database */
  public getUsers(userId: string = ''): Observable<IUsers> {
    return this.userAddService.getData(ApplicationConstants.basePath, ApplicationConstants.usersList,
      ApplicationConstants.contentTYpe, userId);

  }
   /* to add user to database */
  public addUser(userData: IUsers): Observable<IUsers> {
    return this.userAddService.postData(userData, ApplicationConstants.basePath, ApplicationConstants.usersList,
      ApplicationConstants.contentTYpe, ApplicationConstants.contentTYpe);
  }
 /* to get the session for the login user*/
  public setSessionItem(itemLabel: string, itemData: string) {
    sessionStorage.setItem(itemLabel, itemData);

  }
  /* to get the list of  users from database as array*/
  public getUsersList(userId: string = ''): Observable<IUsers[]> {
    return this.userListService.getData(ApplicationConstants.basePath, ApplicationConstants.usersList,
      ApplicationConstants.contentTYpe, userId);

  }

}
