import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { MedicineService } from '../medicine.service';
import { first } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private medicineService: MedicineService) { }

  addForm: FormGroup;
  submitted = false;
  descriptions: FormArray;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      nameLat: ['', Validators.required],
      name: [''],
      description: [''],
      symptoms: [''],
      descriptions: this.formBuilder.array([ this.createItem() ])
    });
  }

  onSubmit(){
    this.submitted = true;
    let data = this.addForm.value;

    console.log('this.addForm.value', this.addForm.value);
    console.log('data 1', data);
    data.symptomsArr = data.symptoms.split(',') as FormArray;
    data.symptomsArr = data.symptomsArr.map(function(item) {
      return item.toLowerCase();
    });

    console.log('data 2', data);

    console.log('data.symptoms', data.symptoms);
    console.log('data.symptomsArr', data.symptomsArr);

    //return;
    if(this.addForm.valid){
      this.medicineService.addMedicine(data)
      .subscribe( data => {
        console.log('data: ' + data);
        this.router.navigate(['']);
      });
    }
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: ''
    });
  }
    
  get description(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: ''
    });
  }    
  
  addItem(): void {
    this.descriptions = this.addForm.get('descriptions') as FormArray;
    this.descriptions.push(this.createItem());
  }

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }

}