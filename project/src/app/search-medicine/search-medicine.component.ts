import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MedicineService } from '../medicine.service';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { MedicineModel } from '../MedicineModel';

//DataService
import { MedicineSearchDataService } from "../medicine-search-data.service";

@Component({
  selector: 'app-search-medicine',
  templateUrl: './search-medicine.component.html',
  styleUrls: ['./search-medicine.component.css']
})
export class SearchMedicineComponent implements OnInit {
  medicamentsArray: any = [];
  searchForm: FormGroup;
  submitted = false;

  //DataService
  constructor(private formBuilder: FormBuilder, private router: Router, private medicineService: MedicineService, private seachMedicamentsData: MedicineSearchDataService) { }

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
    let queryOr = "$or";

    //test
    this.searchForm.value.keyWords = this.searchForm.value.keyWords || 'Apis';
    console.log(this.searchForm.value);

    if(this.searchForm.value && this.searchForm.value.keyWords) {
      // ищем по имени
      if(this.searchForm.value.byName ||
        (!this.searchForm.value.byName && !this.searchForm.value.byArticles && !this.searchForm.value.byDescription && !this.searchForm.value.bySymptoms )) 
      {
          queryParams = 'byName';
         // queryOr = "$or";  //{$regex: 'полезно', $options: 'i'}
         query.query = { "$or": [
           {nameLat: {$regex:  this.searchForm.value.keyWords, $options: 'i'} },
           {name: {$regex: this.searchForm.value.keyWords, $options: 'i'} }
          ] };
      
          /*
          // Нифига не работает
          query.query = { "$or": [
                                  { nameLat: {"$regex":  new RegExp(this.searchForm.value.keyWords)} },
                                  { name: {"$regex": new RegExp(this.searchForm.value.keyWords)}  }
                                ] 
                        };*/
      }
      
      // ищем по симптомом
      if(this.searchForm.value.bySymptoms) {
        query.query[queryOr] = query.query[queryOr] || [];
        query.query[queryOr].push({symptomsArr: this.searchForm.value.keyWords});
        console.log('query', query.query[queryOr]);
      }
      
     // return;
      // if(this.searchForm.value.bySymptoms) {
      //   query.query[queryOr] = query.query[queryOr] || [];
      //   query.query[queryOr].push({symptoms: this.searchForm.value.keyWords});
      //   console.log('query', query.query[queryOr]);
      // }

      // ищем по описанию
      if(this.searchForm.value.byDescription) {
        query.query[queryOr] = query.query[queryOr] || [];
        query.query[queryOr].push({"descriptions.description": {$regex: this.searchForm.value.keyWords, $options: 'i'}});
      }

      // if(this.searchForm.value.byDescription) {
      //   query.query[queryOr] = query.query[queryOr] || [];
      //   query.query[queryOr].push({description: this.searchForm.value.keyWords});
      // }

      // ищем по статьям
      if(this.searchForm.value.byArticles) {
        // Видимо в другой коллекции, посмотрим когда будут статьи
      }
        
      console.log('query', query);

      //if(this.searchForm.valid){
        this.medicineService.findMany(query)
        .subscribe( data => {
          console.log('Попали в searchMedicine класса search-medicine');
          this.medicamentsArray = data;
                  
         //DataService
         this.seachMedicamentsData.changeSearchArr(data);

          this.router.navigate(['']);
        });
      //}
    }
      //{"$or": [{nameLat: "Apis"}, {name: "Apis"}]}
  }


}
