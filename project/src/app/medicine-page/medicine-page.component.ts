import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MedicineService } from '../medicine.service';

@Component({
  selector: 'app-medicine-page',
  templateUrl: './medicine-page.component.html',
  styleUrls: ['./medicine-page.component.css']
})
export class MedicinePageComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private medicineService: MedicineService,) { }

  editForm: FormGroup;
  submitted: boolean = false;
  medicineId = localStorage.getItem("medicineId");

  ngOnInit() {
      if(!this.medicineId){
        alert("Something wrong!");
        this.router.navigate(['']);
        return;
      }

      this.editForm = this.formBuilder.group({
        _id: [],
        nameLat: ['', Validators.required],
        name: [''],
        description: [''],
        description2: [''],
        symptoms: ['']
      });
  
    this.medicineService.getMedicineById(this.medicineId).subscribe(data=>{
      console.log(data);
      this.editForm.patchValue(data); //Don't use editForm.setValue() as it will throw console error
    });
  }
  
  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }
  
  onSubmit(){
    this.submitted = true;
    
    if(this.editForm.valid){
      this.medicineService.updateMedicine(this.editForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['']);
      });
    }
  }
  
  deleteMedicine(){
      this.medicineService.deleteMedicine(this.medicineId)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['']);
      });

  }

}
