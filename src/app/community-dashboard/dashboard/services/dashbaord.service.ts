import { Injectable } from '@angular/core';
import { RestService } from '../../../core-services/rest.service';
import { IGroups, IUserGroups, IMessages } from '../../../models/users';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApplicationConstants } from '../../../constants/applicationConstant';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  public groupInfo: BehaviorSubject<IGroups> = new BehaviorSubject<IGroups>({} as IGroups);

  constructor(private groupsList: RestService<IGroups>, private userGroupsList: RestService<IUserGroups>,
              private messageService: RestService<IMessages>, private getMessageService: RestService<IMessages[]>) { }

  public getGroupsList(groupId: string = ''): Observable<IGroups> {
    return this.groupsList.getData(ApplicationConstants.basePath, ApplicationConstants.groupsList,
      ApplicationConstants.contentTYpe, groupId);

  }
  public getUserGroupsList(userId: string = ''): Observable<IUserGroups> {
    return this.userGroupsList.getData(ApplicationConstants.basePath, ApplicationConstants.userGroupsList,
      ApplicationConstants.contentTYpe, userId);

  }
  public addUserToGroup(userData: IUserGroups): Observable<IUserGroups> {

    return this.userGroupsList.postData(userData, ApplicationConstants.basePath, ApplicationConstants.userGroupsList,
      ApplicationConstants.contentTYpe, ApplicationConstants.contentTYpe);
  }
  public addMessage(messageData: IMessages): Observable<IMessages> {

    return this.messageService.postData(messageData, ApplicationConstants.basePath, ApplicationConstants.messageList,
      ApplicationConstants.contentTYpe, ApplicationConstants.contentTYpe);
  }

  public getMessageList(groupId: string = ''): Observable<IMessages[]> {
    return this.getMessageService.getData(ApplicationConstants.basePath, ApplicationConstants.messageList,
      ApplicationConstants.contentTYpe, groupId);

  }
}
