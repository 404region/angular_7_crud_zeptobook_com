import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MedicineService } from '../medicine.service';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { MedicineModel } from '../MedicineModel';

@Component({
  selector: 'app-search-medicine',
  templateUrl: './search-medicine.component.html',
  styleUrls: ['./search-medicine.component.css']
})
export class SearchMedicineComponent implements OnInit {



  //@Output() onChanged = new EventEmitter<any>();

  medicamentsArray: any = [];
  searchForm: FormGroup;
  submitted = false;

  //messageFromChild = 'Hello My World';
  //@Output() messageEvent = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder, private router: Router, private medicineService: MedicineService) { }

  /*sendMessage() {
    this.messageEvent.emit(this.messageFromChild)
  }*/

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      keyWords: ['', Validators.required],
      byName: [''],
      bySymptoms: [''],
      byDescription: [''],
      byArticles: ['']
    });
  }
  
  searchMedicine(){
    this.submitted = true;
    console.log(this.searchForm.value);
    let query = {query: {}};
    let queryParams = '';

    //test
    this.searchForm.value.keyWords = 'Apis';
    console.log(this.searchForm.value.keyWords);

    if(this.searchForm.value && this.searchForm.value.keyWords) {
      //this.messageFromChild = 'dskjdshhds';
      //this.sendMessage();

      // ищем по имени
      if(this.searchForm.value.byName ||
        (!this.searchForm.value.byName && !this.searchForm.value.byArticles && !this.searchForm.value.byDescription && !this.searchForm.value.bySymptoms )) {
          queryParams = 'byName';
          query.query = { "$or": [{nameLat: this.searchForm.value.keyWords}, {name: this.searchForm.value.keyWords}] };
          //this.medicamentsArray = [];
        }
        
      console.log('query', query);

      //if(this.searchForm.valid){
        this.medicineService.findMany(query)
        .subscribe( data => {
          console.log('Попали в searchMedicine класса search-medicine');
          this.medicamentsArray = data;
         // this.onChanged.emit('emit');
          this.router.navigate(['']);
        });
      //}
    }
      //{"$or": [{nameLat: "Apis"}, {name: "Apis"}]}

    
  }


}
