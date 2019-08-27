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
    console.log(this.addForm.value);
    
    if(this.addForm.valid){
      this.medicineService.addMedicine(this.addForm.value)
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
  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }

}