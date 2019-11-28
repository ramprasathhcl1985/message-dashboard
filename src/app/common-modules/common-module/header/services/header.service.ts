import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public enableMenus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loginUserName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }
}
