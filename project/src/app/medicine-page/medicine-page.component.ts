import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
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
  descriptions: FormArray;
  
  ngOnInit() {
    this.editForm = this.formBuilder.group({
      _id: ['', Validators.required],
      nameLat: [''],
      name: [''],
      description: [''],
      symptoms: [''],
      descriptions: this.formBuilder.array([ this.createItem() ])
    });

    if(!this.medicineId){
      alert("Something wrong!");
      this.router.navigate(['']);
      return;
    }
  
    this.medicineService.getMedicineById(this.medicineId).subscribe(data=>{
      console.log(data);
      this.editForm.patchValue(data); //Don't use editForm.setValue() as it will throw console error

      // for(let i = 0; i < data.descriptions.length; i++) {
      //    console.log(data.descriptions[i]);
      //    // this.editForm.value.descriptions.push(data.descriptions[i] as FormArray);
      //    this.editForm.value.descriptions.push({name: 'name - источник','description - источник'} as FormArray);
      // }
    });    
  }
  

  // get descriptions() {
  //  return this.editForm.get('descriptions') as FormArray;
  // }

  // addItems() {
  //   console.log('addItems');
  //   this.items.push(this.formBuilder.control(''));
  // }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: ''
    });
  }
  
  addItem(): void {
    this.descriptions = this.editForm.get('descriptions') as FormArray;
    this.descriptions.push(this.createItem());
  }

  onSubmit(){
    console.log('onSubmit');
    console.log('form: ', this.editForm.value);
    //return;

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
