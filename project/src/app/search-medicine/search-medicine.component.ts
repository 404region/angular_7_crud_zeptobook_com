import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../medicine.service';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: 'app-search-medicine',
  templateUrl: './search-medicine.component.html',
  styleUrls: ['./search-medicine.component.css']
})
export class SearchMedicineComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private medicineService: MedicineService) { }

  searchForm: FormGroup;
  submitted = false;

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      keyWords: ['', Validators.required],
      byName: [''],
      bySymptoms: [''],
      byDescription: [''],
      byArticles: ['']
    });
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.searchForm.value);
    
    if(this.searchForm.valid){
      this.medicineService.addMedicine(this.searchForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['']);
      });
    }
  }

}
