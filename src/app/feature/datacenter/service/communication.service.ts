import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CommunicationService {

  private messageSource = new BehaviorSubject('default message');
  private messageEditSource = new BehaviorSubject('default message');
  private messageDcaTypeSource=new BehaviorSubject('default message');
  
  currentMessage = this.messageSource.asObservable();
  editMessage = this.messageEditSource.asObservable();
  dcaTypeMessage=this.messageDcaTypeSource.asObservable();

  constructor() { }

  changeMessage(message: any) {
    this.messageSource.next(message)
  }
  changeEditMessage(message: any) {
    this.messageEditSource.next(message)
  }
  changeDcaTypeMessage(message: any) {
    this.messageDcaTypeSource.next(message)
  }
}