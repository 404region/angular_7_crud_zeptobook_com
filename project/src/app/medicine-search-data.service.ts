import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MedicineSearchDataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  
  
  private searchArr = new BehaviorSubject([]);
  currentSearchArr = this.searchArr.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeSearchArr(currentSearchArr: any) {
    this.searchArr.next(currentSearchArr)
  }
}