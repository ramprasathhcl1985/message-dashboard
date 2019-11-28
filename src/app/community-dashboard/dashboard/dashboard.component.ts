import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from './services/dashbaord.service';
import { IGroups, IUserGroups, IMessages } from '../../models/users';
import { ApplicationConstants } from '../../constants/applicationConstant';
import { HeaderService } from '../../common-modules/common-module/header/services/header.service';
import { UserApiService } from '../../common-modules/common-module/user-register/services/user-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public groupList: IGroups[];
  public userGroupsList: IUserGroups[];
  public userGroupsListTwo: IUserGroups[];
  public selectedGroup: IGroups;
  public groupMessageList: IMessages[];
  public filteredMessages: IMessages[];
  public currentUserGroups: string[] = [];
  public userIndexArr: string[] = [];
  public userId: string;
  public messageString: string;
  public showNoRecords: boolean = false;

  constructor(private dashboard: DashboardService, private router: Router,
    private headerService: HeaderService, private userService: UserApiService) { }

  ngOnInit() {
    this.dashboard.getGroupsList().
      subscribe((data: IGroups) => {
        Object.keys(data).length > 0 ? this.dashboard.groupInfo.next(data[0]) : '';
        this.groupList = Object.values(data);
        if (sessionStorage.getItem(ApplicationConstants.userLoginId)) {
          this.userId = sessionStorage.getItem(ApplicationConstants.userLoginId);
          this.headerService.enableMenus.next(true);
        } else {
          this.userId = '0';
          this.router.navigateByUrl('/login');
        }

        /* to get the list of users with groups */
        this.getUserGroups(this.userId);
        /* to get the list of messages */
        this.getMessageList();
        /* to get the list of users */
        this.getUsersList();
      });
    this.dashboard.groupInfo.subscribe((data) => {
      this.selectedGroup = data;
    })
  }
  /* to subscibe the group  */
  public addToGroup(grpItem: IGroups): void {
    if (this.checkUserAlreadyExistsInGroup(grpItem) && confirm(ApplicationConstants.joinGroupMessage)) {
      this.dashboard.groupInfo.next(grpItem);
      const userGroupAddItem: IUserGroups = {
        groupName: grpItem.groupName,
        groupMembers: '1',
        groupId: grpItem.id.toString(),
        userId: this.userId
      }
      this.dashboard.addUserToGroup(userGroupAddItem).subscribe((data) => {
        this.dashboard.groupInfo.next(grpItem);
        this.currentUserGroups.push(grpItem.id.toString());
      })
    } else {
      this.dashboard.groupInfo.next(grpItem);
    }
    /* to filter and get the required messages for that corresponding group */
    this.getRequiredMessages(this.groupMessageList);
  }
  // to get the list of groups for that current user
  private getUserGroups(userId: string) {
    this.dashboard.getUserGroupsList().subscribe((data) => {
      this.userGroupsList = Object.values(data);
      this.userGroupsList = this.userGroupsList.filter((item) => item.userId == userId.toString());
      for (let i = 0; i < this.userGroupsList.length; i++) {
        this.currentUserGroups.push(this.userGroupsList[i].groupId);
      }
    });
  }
  // to check the user is part of a particular group
  private checkUserAlreadyExistsInGroup(grpItem: IGroups): boolean {
    let userExits: IUserGroups[];
    userExits = this.userGroupsList.filter((data) => data.groupId == grpItem.id.toString() && data.userId === this.userId.toString());
    return (userExits.length > 0) ? false : true;
  }
  // to post messages to the group
  public postComment(grpItem: IGroups) {
    if (grpItem && this.messageString) {
      const messageItem: IMessages = {
        messageText: this.messageString,
        userId: this.userId,
        groupId: grpItem.id.toString()
      }
      this.dashboard.addMessage(messageItem).subscribe((data) => {
        this.messageString = '';
        /* to get the updated list of messages */
        this.getMessageList();
      })
    }
  }
  // to get the list of messages of that group
  public getMessageList() {
    this.dashboard.getMessageList().
      subscribe((data) => {
        this.groupMessageList = data;
        this.getRequiredMessages(this.groupMessageList);
      });
  }
  // to filter the group messages 
  getRequiredMessages(messages: IMessages[]) {
    this.filteredMessages = messages.filter((messageObject: IMessages) =>
      messageObject.groupId === this.selectedGroup.id.toString());
    /* to  show no records found */
    this.showNoRecords = (this.filteredMessages.length === 0) ? true : false;
  }
  /* to get the list of users */
  public getUsersList() {
    this.userService.getUsersList().subscribe((data) => {
      this.userService.usersListArr = data;
      for (let i = 0; i < (this.userService.usersListArr.length); i++) {
        /* to display the user name in UI */
        this.userIndexArr[this.userService.usersListArr[i].id] = this.userService.usersListArr[i].userName;
      }
    });
  }
}
