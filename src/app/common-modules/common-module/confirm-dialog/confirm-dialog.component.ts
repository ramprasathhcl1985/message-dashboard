import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import { IGroups } from '../../../models/users';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
  providers: [ConfirmationService]
})
export class ConfirmDialogComponent implements OnInit {

  @Input('groupItem') groupItemInput: IGroups;
  @Output() isConfirmed = new EventEmitter<IGroups>();
  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }

  confirm() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
           this.isConfirmed.emit(this.groupItemInput);
        }
    });
}

}
